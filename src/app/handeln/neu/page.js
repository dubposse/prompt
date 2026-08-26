"use client"

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getLabel } from "@/lib/labels";


export default function NeueMassnahmePage() {
  return (
    <Suspense
      fallback={
        <main>
          <p className="state-message">
            Seite wird geladen...
          </p>
        </main>
      }
    >
      <NeueMassnahmeContent />
    </Suspense>
  );
}

function NeueMassnahmeContent() {
  const searchParams = useSearchParams();
  const area = searchParams.get("bereich");

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isIncidents = area === "problemmeldungen";
  const isLearning = area === "lernbedarfe";

  const [selectedCase, setSelectedCase] = useState(null);

  const [title, setTitle] = useState("");
  const [measureType, setMeasureType] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isIncidents && !isLearning) {
      setError("Ungültiger Bereich.");
      setLoading(false);
      return;
    }

    loadCases();
  }, [area]);

  async function loadCases() {
    try {
      setLoading(true);
      setError("");

      const url = isIncidents
        ? "/api/incidents/open"
        : "/api/learning-requests/open";

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Offene Fälle konnten nicht geladen werden."
        );
        return;
      }

      setCases(data);
    } catch (error) {
      console.error(error);
      setError("Offene Fälle konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
  setTitle("");
  setMeasureType("");
  setDescription("");
  setScheduledAt("");
}

function backToCases() {
  setSelectedCase(null);
  resetForm();
}


async function createMeasure() {
  try {
    setSaving(true);
    setFormError("");

    const res = await fetch("/api/measures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incidentReportId: isIncidents
          ? selectedCase.id
          : null,

        learningRequestId: isLearning
          ? selectedCase.id
          : null,

        measureType,
        title,
        description,
        scheduledAt: scheduledAt || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setFormError(
        data.error || "Maßnahme konnte nicht angelegt werden."
      );
      return;
    }

    setCases((currentCases) =>
      currentCases.filter(
        (item) => item.id !== selectedCase.id
      )
    );

    setSelectedCase(null);
    resetForm();
  } catch (error) {
    console.error(error);
    setFormError("Maßnahme konnte nicht angelegt werden.");
  } finally {
    setSaving(false);
  }
}



  if (loading) {
    return (
      <main>
        <p className="state-message">
          Offene Fälle werden geladen...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p className="state-message">{error}</p>
      </main>
    );
  }


  console.log({
  title,
  measureType,
  description,
  scheduledAt,
});


  return (
    <main>
      <Link href="/handeln" className="back-button">
        ← Fälle bearbeiten
      </Link>

      <div className="page-heading">
        <div>
          <p className="eyebrow">Neue Maßnahme</p>

          <h1>
            {isIncidents
              ? "Offene Problemmeldungen"
              : "Offene Lernbedarfe"}
          </h1>

          <p className="page-intro">
            Wählen Sie einen Fall aus, für den eine neue Maßnahme
            angelegt werden soll.
          </p>
        </div>
      </div>

{selectedCase ? (
  <section className="detail-section">
    <button
      type="button"
      className="back-button"
      onClick={backToCases}
    >
      ← Offene Fälle
    </button>

    <p className="eyebrow">
      {isIncidents ? "Problemmeldung" : "Lernbedarf"}
    </p>

    <h2>{selectedCase.district}</h2>

    <div className="measure-context">
      {selectedCase.school_type && (
        <span>{getLabel(selectedCase.school_type)}</span>
      )}

      {selectedCase.grade_level && (
        <span>
          Jahrgang {selectedCase.grade_level}
        </span>
      )}

      {selectedCase.reporter_role && (
        <span>
      Gemeldet von: {getLabel(selectedCase.reporter_role)}
        </span>
      )}
    </div>

    <div className="detail-grid">
      <div className="detail-item">
        <span className="detail-label">
          {isIncidents ? "Kategorie" : "Fach / Bereich"}
        </span>

        <span className="detail-value">
          {isIncidents
            ? getLabel(selectedCase.category)
            : selectedCase.subject}
        </span>
      </div>

      {selectedCase.description && (
        <div className="detail-item detail-item-wide">
          <span className="detail-value detail-value-long">
            {selectedCase.description}
          </span>
        </div>
      )}
    </div>

<div className="report-form">
  <p className="eyebrow">Neue Maßnahme</p>

  <div className="form-grid">
    <label htmlFor="measure-title">
      Titel

      <input
        id="measure-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </label>

    <label htmlFor="measure-type">
      Maßnahmentyp

      <select
        id="measure-type"
        value={measureType}
        onChange={(event) =>
          setMeasureType(event.target.value)
        }
      >
        <option value="">
          Bitte auswählen
        </option>

        {isIncidents ? (
          <>
            <option value="praeventionsbesuch">
              Präventionsbesuch
            </option>

            <option value="veranstaltung">
              Veranstaltung
            </option>

            <option value="sonstiges">
              Sonstiges
            </option>
          </>
        ) : (
          <option value="micro_app">
            Micro-App
          </option>
        )}
      </select>
    </label>
  </div>

  <div className="form-full">
    <label htmlFor="measure-description">
      Beschreibung

      <textarea
        id="measure-description"
        rows="5"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />
    </label>
  </div>

  <div className="form-full">
    <label htmlFor="scheduled-at">
      Termin

      <input       
        id="scheduled-at"
        type="date"
        value={scheduledAt}
        onChange={(event) =>
          setScheduledAt(event.target.value)
        }
      />
    </label>
  </div>

  {formError && (
    <p className="form-message">
      {formError}
    </p>
  )}

  <button
    type="button"
    className="primary-button"
    onClick={createMeasure}
    disabled={saving}
  >
    {saving
      ? "Wird angelegt..."
      : "Maßnahme anlegen"}
  </button>
</div>

  </section>
) : (
  <>
    <div className="section-heading">
      <h2>
        {isIncidents ? "Problemmeldungen" : "Lernbedarfe"}
      </h2>

      <span className="measure-count">
        {cases.length} offen
      </span>
    </div>

    {cases.length === 0 ? (
      <p className="state-message">
        Aktuell sind keine offenen Fälle vorhanden.
      </p>
    ) : (
      <div className="measure-list">
        {cases.map((item) => (
          <article
            className="measure-card"
            key={item.id}
          >
            <div className="measure-card-top">
              <span className="measure-source">
                {isIncidents
                  ? "Problemmeldung"
                  : "Lernbedarf"}
              </span>
            </div>

            <h3>{item.district}</h3>

            <div className="measure-context">
              {item.school_type && (
                <span>
                  {getLabel(item.school_type)}
                </span>
              )}

              {item.grade_level && (
                <span>
                  Jahrgang {item.grade_level}
                </span>
              )}

              {item.reporter_role && (
                <span>
              Gemeldet von: {getLabel(item.reporter_role)}
                </span>
           )}
            </div>


            <div className="measure-details">
              <strong>
                {isIncidents
                  ? getLabel(item.category)
                  : item.subject}
              </strong>
            </div>

            {item.description && (
              <p className="open-case-description">
                {item.description}
              </p>
            )}

            <div className="measure-footer">
              <span>
                {isIncidents
                  ? getLabel(item.frequency)
                  : item.topic || "Lernbedarf"}
              </span>

              <button
                type="button"
                className="select-case-button"
                onClick={() => setSelectedCase(item)}
              >
                Auswählen →
              </button>
            </div>
          </article>
        ))}
      </div>
    )}
  </>
)}
    </main>
  );
}
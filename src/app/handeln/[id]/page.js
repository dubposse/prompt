"use client";

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { getLabel } from "@/lib/labels"

const MEASURE_STATUSES = [
  "geplant",
  "priorisiert",
  "in_bearbeitung",
  "bereitgestellt",
  "abgeschlossen",
];

export default function MeasureDetailPage({ params }) {
  const { id } = use(params);

  const [measure, setMeasure] = useState(null);
  const [resources, setResources] = useState([]);
  const [availableResources, setAvailableResources] = useState([]);
  const [selectedResourceId, setSelectedResourceId] = useState("");
  const [linkingResource, setLinkingResource] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resourceError, setResourceError] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [scheduledAtInput, setScheduledAtInput] = useState("");
  const [savingDate, setSavingDate] = useState(false);
  


  useEffect(() => {
    loadMeasure();
    loadAvailableResources();
  }, [id]);

  async function loadMeasure() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/measures/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Maßnahme konnte nicht geladen werden."
        );
        return;
      }

      setMeasure(data.measure);
      setResources(data.resources);
    } catch (error) {
      console.error(error);
      setError("Maßnahme konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main>
        <p className="state-message">
          Maßnahme wird geladen...
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

  if (!measure) {
    return null;
  }

  const isIncident = Boolean(measure.incident_id);

  const district = isIncident
    ? measure.incident_district
    : measure.learning_district;

  const schoolType = isIncident
    ? measure.incident_school_type
    : measure.learning_school_type;

  const gradeLevel = isIncident
    ? measure.incident_grade_level
    : measure.learning_grade_level;


    async function changeStatus(newStatus) {
  try {
    setSavingStatus(true);
    setError("");

    const res = await fetch(`/api/measures/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Status konnte nicht geändert werden.");
      return;
    }

    setMeasure((currentMeasure) => ({
      ...currentMeasure,
      status: data.status,
    }));
  } catch (error) {
    console.error(error);
    setError("Status konnte nicht geändert werden.");
  } finally {
    setSavingStatus(false);
  }
}


async function changeScheduledAt() {
  try {
    setSavingDate(true);
    setError("");

    const res = await fetch(`/api/measures/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduledAt: scheduledAtInput,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(
        data.error || "Termin konnte nicht geändert werden."
      );
      return;
    }

    setMeasure((currentMeasure) => ({
      ...currentMeasure,
      scheduled_at: data.scheduled_at,
    }));

    setScheduledAtInput("");
  } catch (error) {
    console.error(error);
    setError("Termin konnte nicht geändert werden.");
  } finally {
    setSavingDate(false);
  }
}

async function removeScheduledAt() {
  try {
    setSavingDate(true);
    setError("");

    const res = await fetch(`/api/measures/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduledAt: null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(
        data.error || "Termin konnte nicht entfernt werden."
      );
      return;
    }

    setMeasure((currentMeasure) => ({
      ...currentMeasure,
      scheduled_at: data.scheduled_at,
    }));

    setScheduledAtInput("");
  } catch (error) {
    console.error(error);
    setError("Termin konnte nicht entfernt werden.");
  } finally {
    setSavingDate(false);
  }
}

async function loadAvailableResources() {
  try {
    const res = await fetch("/api/learning-resources");
    const data = await res.json();

    if (!res.ok) {
      return;
    }

    setAvailableResources(data);
  } catch (error) {
    console.error(error);
  }
}


async function linkResource() {
  if (!selectedResourceId) {
    return;
  }

  try {
    setLinkingResource(true);

    const res = await fetch(
      `/api/measures/${id}/resources`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId: Number(selectedResourceId),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setResourceError(
        data.error || "Ressource konnte nicht verknüpft werden."
      );
      return;
    }

    setSelectedResourceId("");

    await loadMeasure();
  } catch (error) {
    console.error(error);
    setResourceError("Ressource konnte nicht verknüpft werden.");
  } finally {
    setLinkingResource(false);
  }
}

const selectableResources = availableResources.filter(
  (availableResource) =>
    !resources.some(
      (linkedResource) =>
        linkedResource.id === availableResource.id
    )
);

// Function to unlink a resource from the measure
async function unlinkResource(resourceId) {
  try {
    setResourceError("");

    const res = await fetch(
      `/api/measures/${id}/resources/${resourceId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setResourceError(
        data.error || "Verknüpfung konnte nicht entfernt werden."
      );
      return;
    }

    await loadMeasure();
  } catch (error) {
    console.error(error);
    setResourceError(
      "Verknüpfung konnte nicht entfernt werden."
    );
  }
}


  return (
    <main>
      <Link href="/handeln" className="back-button">
        ← Maßnahmen
      </Link>

      <div className="detail-header">
        <div>
          <p className="eyebrow">
            {isIncident ? "Problemmeldung" : "Lernbedarf"}
          </p>

          <h1>{district}</h1>

          <div className="measure-context">
            {schoolType && (
              <span>{getLabel(schoolType)}</span>
            )}

            {gradeLevel && (
              <span>Jahrgang {gradeLevel}</span>
            )}
          </div>
        </div>

        <span className="measure-status">
          {getLabel(measure.status)}
        </span>
      </div>

      <section className="detail-section">
        <p className="eyebrow">
          {isIncident ? "Problemmeldung" : "Lernbedarf"}
        </p>

        {isIncident ? (
          <div className="detail-grid">
            <DetailItem
              label="Kategorie"
              value={getLabel(measure.incident_category)}
            />

            <DetailItem
              label="Häufigkeit"
              value={getLabel(measure.incident_frequency)}
            />

            <DetailItem
              label="Gemeldet von"
              value={getLabel(
                measure.incident_reporter_role
              )}
            />

            <DetailItem
              value={measure.incident_description}
              wide
            />
          </div>
        ) : (
          <div className="detail-grid">
            <DetailItem
              label="Fach / Bereich"
              value={measure.learning_subject}
            />

            <DetailItem
              label="Thema"
              value={measure.learning_topic}
            />

            <DetailItem
              label="Formatwunsch"
              value={getLabel(
                measure.learning_preferred_format
              )}
            />

            <DetailItem
              label="Gemeldet von"
              value={getLabel(
                measure.learning_reporter_role
              )}
            />

            <DetailItem
              value={measure.learning_description}
              wide
            />
          </div>
        )}
      </section>

      <section className="detail-section">
        <p className="eyebrow">Maßnahme</p>

        <h2>{measure.title}</h2>

        <div className="detail-grid">
  <div className="detail-item measure-type-status-item">
  <div>
    <span className="detail-label">
      Typ
    </span>

    <span className="detail-value">
      {getLabel(measure.measure_type)}
    </span>
  </div>

  <div className="measure-status-control">
    <span className="detail-label">
      Status
    </span>

    <select
      className="measure-status-select"
      value={measure.status}
      onChange={(event) =>
        changeStatus(event.target.value)
      }
      disabled={savingStatus}
    >
      {MEASURE_STATUSES.map((status) => (
        <option key={status} value={status}>
          {getLabel(status)}
        </option>
      ))}
    </select>
  </div>
</div>

     <div className="detail-item measure-date-item">
  <div className="measure-date-current">
    <span className="detail-label">
      Termin
    </span>

    <span className="detail-value">
      {measure.scheduled_at
        ? formatDate(measure.scheduled_at)
        : "Termin offen"}
    </span>
  </div>

  <div className="measure-date-control">
  <div className="measure-date-heading">
    <span className="detail-label">
      {measure.scheduled_at
        ? "Termin ändern"
        : "Termin festlegen"}
    </span>

    {measure.scheduled_at && (
      <button
        type="button"
        className="measure-date-remove"
        onClick={removeScheduledAt}
        disabled={savingDate}
        aria-label="Termin entfernen"
        title="Termin entfernen"
      >
        🗑
      </button>
    )}
  </div>

    <input
      type="date"
      value={scheduledAtInput}
      onChange={(event) =>
        setScheduledAtInput(event.target.value)
      }
      className="measure-date-input"
    />

    <button
      type="button"
      className="measure-date-button"
      onClick={changeScheduledAt}
      disabled={!scheduledAtInput || savingDate}
    >
      {savingDate ? "Wird gespeichert..." : "Speichern"}
    </button>

   
  </div>
</div>

          {measure.description && (
            <DetailItem
              value={measure.description}
              wide
            />
          )}
        </div>
      </section>

      <section className="detail-section">
       <div className="section-heading">
  <p className="eyebrow">Ressourcen</p>

  <span className="measure-count">
    {resources.length}
  </span>
</div>



          <div className="resource-assignment-form">
  <label htmlFor="resource-select">
  Digitale Lernressource verknüpfen
</label>

<div className="resource-assignment-row">
  <select
    id="resource-select"
    value={selectedResourceId}
    onChange={(event) =>
      setSelectedResourceId(event.target.value)
    }
  >
    <option value="">
      Ressource auswählen
    </option>

    {selectableResources.map((resource) => (
      <option
        key={resource.id}
        value={resource.id}
      >
        {resource.title}
      </option>
    ))}
  </select>

  <button
    type="button"
    className="primary-button"
    onClick={linkResource}
    disabled={!selectedResourceId || linkingResource}
  >
    {linkingResource
      ? "Wird verknüpft..."
      : "Ressource verknüpfen"}
  </button>
</div>

                  
        </div>

        {resources.length === 0 ? (
          <p className="state-message">
            Dieser Maßnahme ist keine ergänzende digitale Lernressource zugeordnet.
          </p>
        ) : (
          <div className="resource-list">
            {resources.map((resource) => (
              <article
                className="resource-card"
                key={resource.id}
              >
                <h3>{resource.title}</h3>

<p className="resource-assignment">
  {isIncident
    ? `Ergänzende digitale Lernressource zur Maßnahme „${measure.title}“`
    : "Diese Maßnahme wird als interaktives digitales Lernangebot bereitgestellt."}
</p>

{resource.description && (
  <p>{resource.description}</p>
)}

<div className="resource-actions">
{resource.url && resource.url !== "#" && (
  <a
    href={resource.url}
    target="_blank"
    rel="noreferrer"
    className="resource-link"
  >
    Ressource öffnen →
  </a>
)}


<button
  type="button"
  className="unlink-resource-button"
  onClick={() => unlinkResource(resource.id)}
>
  Verknüpfung lösen
</button>
</div>

              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}


function DetailItem({ label, value, wide = false }) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={
        wide
          ? "detail-item detail-item-wide"
          : "detail-item"
      }
    >
       {label && (
  <span className="detail-label">
    {label}
  </span>
)}

      <span
        className={
          wide
            ? "detail-value detail-value-long"
            : "detail-value"
        }
      >
        {value}
      </span>
    </div>
  );
}


function formatDate(value) {
  return new Date(value).toLocaleDateString("de-DE");
}
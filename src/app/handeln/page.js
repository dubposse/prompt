"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import { getLabel } from "@/lib/labels"

export default function HandelnPage() {
  const [measures, setMeasures] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMeasures();
  }, []);

  async function loadMeasures() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/measures");
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Maßnahmen konnten nicht geladen werden."
        );
        return;
      }

      setMeasures(data);
    } catch (error) {
      console.error(error);
      setError("Maßnahmen konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  function selectArea(area) {
    setSelectedArea(area);
  }

  const filteredMeasures = measures.filter((measure) => {
    if (selectedArea === "incidents") {
      return Boolean(measure.incident_id);
    }

    if (selectedArea === "learning") {
      return Boolean(measure.learning_request_id);
    }

    return false;
  });

  if (loading) {
    return (
      <main>
        <p className="state-message">
          Maßnahmen werden geladen...
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

  return (
    <main>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Maßnahmen</p>
          <h1>Handeln</h1>

          <p className="page-intro">
            Aus Meldungen und Bedarfen konkrete Maßnahmen entwickeln.
          </p>
        </div>
      </div>

      {!selectedArea && (
        <section>
          <h2>Wo möchten Sie handeln?</h2>

          <div className="report-type-grid">
            <div className="report-type-card-wrapper">
  <button
    className="report-type-card"
    onClick={() => selectArea("incidents")}
  >
    <span className="report-type-title">
      Problemmeldungen
    </span>

    <span className="report-type-text">
      Maßnahmen zu gemeldeten Problemen und
      Unterstützungsbedarfen ansehen.
    </span>

    <span className="report-type-action">
      Maßnahmen ansehen →
    </span>
  </button>

  <Link
    href="/handeln/neu?bereich=problemmeldungen"
    className="new-measure-link"
  >
    + Neue Maßnahme
  </Link>
</div>

            <div className="report-type-card-wrapper">
  <button
    className="report-type-card"
    onClick={() => selectArea("learning")}
  >
    <span className="report-type-title">
      Lernbedarfe
    </span>

    <span className="report-type-text">
      Maßnahmen zu gemeldeten Lernbedarfen ansehen.
    </span>

    <span className="report-type-action">
      Maßnahmen ansehen →
    </span>
  </button>

  <Link
    href="/handeln/neu?bereich=lernbedarfe"
    className="new-measure-link"
  >
    + Neue Maßnahme
  </Link>
</div>
          </div>
        </section>
      )}

      {selectedArea && (
        <section>
          <button
            className="back-button"
            type="button"
            onClick={() => selectArea(null)}
          >
            ← Auswahl
          </button>

          <div className="section-heading">
            <h2>
              {selectedArea === "incidents"
                ? "Problemmeldungen"
                : "Lernbedarfe"}
            </h2>

            <span className="measure-count">
              {filteredMeasures.length} Maßnahmen
            </span>
          </div>

          {filteredMeasures.length === 0 ? (
            <p className="state-message">
              In diesem Bereich sind noch keine Maßnahmen vorhanden.
            </p>
          ) : (
            <div className="measure-list">
              {filteredMeasures.map((measure) => {
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

                const category = isIncident
                  ? measure.incident_category
                  : measure.learning_subject;

                return (
                  <article
                    className="measure-card"
                    key={measure.id}
                  >
                    <div className="measure-card-top">
                      <span className="measure-source">
                        {isIncident
                          ? "Problemmeldung"
                          : "Lernbedarf"}
                      </span>

                      <span className="measure-status">
                        {getLabel(measure.status)}
                      </span>
                    </div>

                    <h3>{district}</h3>

                    <div className="measure-context">
                      {schoolType && (
                        <span>
                          {getLabel(schoolType)}
                        </span>
                      )}

                      {gradeLevel && (
                        <span>
                          Jahrgang {gradeLevel}
                        </span>
                      )}
                    </div>

                    <div className="measure-details">
                      <strong>
                        {isIncident
                          ? getLabel(category)
                          : category}
                      </strong>
                    </div>

                    <div className="measure-footer">
                      <span>
                        {measure.measure_type
                          ? getLabel(measure.measure_type)
                          : "Maßnahme"}

                        {measure.title && (
                          <>
                            {" – "}
                            {measure.title}
                          </>
                        )}
                      </span>

                      <Link
                        href={`/handeln/${measure.id}`}
                        className="measure-detail-link"
                      >
                        Details →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </main>
  );
}


function formatDate(value) {
  return new Date(value).toLocaleDateString("de-DE");
}
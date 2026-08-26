"use client";

import Link from "next/link";
import { useState } from "react";
import { BAVARIAN_REGIONS } from "@/lib/bavaria";
import {
  LEARNING_SUBJECTS,
  LEARNING_FORMATS,
} from "@/lib/learning";

const initialIncidentForm = {
  reporterRole: "",
  schoolType: "",
  district: "",
  gradeLevel: "",
  category: "",
  description: "",
  frequency: "",
};

const initialLearningForm = {
  reporterRole: "",
  schoolType: "",
  district: "",
  gradeLevel: "",
  subject: "",
  topic: "",
  description: "",
  preferredFormat: "offen",
};

const GRADE_LEVELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

const FORMAT_LABELS = {
  offen: "Offen",
  microlearning: "Microlearning",
  quiz: "Quiz",
  simulation: "Simulation",
  mix: "Mix",
};

function DistrictOptions() {
  return BAVARIAN_REGIONS.map((region) => (
    <optgroup key={region.region} label={region.region}>
      {region.districts.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </optgroup>
  ));
}

export default function MeldenPage() {
  const [formType, setFormType] = useState(null);
  const [incidentForm, setIncidentForm] = useState(initialIncidentForm);
  const [learningForm, setLearningForm] = useState(initialLearningForm);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function selectForm(type) {
    setFormType(type);
    setMessage("");
  }

  function handleIncidentChange(event) {
    const { name, value } = event.target;

    setIncidentForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleLearningChange(event) {
    const { name, value } = event.target;

    setLearningForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleIncidentSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error || "Meldung konnte nicht gespeichert werden."
        );
        return;
      }

      setIncidentForm(initialIncidentForm);
      setMessage("Die Meldung wurde erfolgreich erfasst.");
    } catch (error) {
      console.error(error);
      setMessage("Meldung konnte nicht gespeichert werden.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLearningSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const res = await fetch("/api/learning-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(learningForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.error || "Lernbedarf konnte nicht gespeichert werden."
        );
        return;
      }

      setLearningForm(initialLearningForm);
      setMessage("Der Lernbedarf wurde erfolgreich erfasst.");
    } catch (error) {
      console.error(error);
      setMessage("Lernbedarf konnte nicht gespeichert werden.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Erfassen</p>
          <h1>Melden</h1>
          <p className="page-intro">
            Situationen und konkrete Lernbedarfe strukturiert erfassen.
          </p>
        </div>
      </div>

      {!formType && (
        <section>
          <h2>Was möchten Sie melden?</h2>

          <div className="report-type-grid">
            <button
              className="report-type-card"
              onClick={() => selectForm("incident")}
            >
              <span className="report-type-title">
                Problem / Unterstützung
              </span>

              <span className="report-type-text">
                Eine Situation oder einen Unterstützungsbedarf melden.
              </span>

              <span className="report-type-action">
                Meldung starten →
              </span>
            </button>

            <button
              className="report-type-card"
              onClick={() => selectForm("learning")}
            >
              <span className="report-type-title">
                Lernbedarf
              </span>

              <span className="report-type-text">
                Bedarf an Lern-, Informations- oder Trainingsangeboten melden.
              </span>

              <span className="report-type-action">
                Bedarf melden →
              </span>
            </button>
          </div>
        </section>
      )}




      <p className="privacy-note">
    Sie können die Anwendung gerne mit eigenen Testdaten ausprobieren.      
  <br /> <br />      
  Für eine Meldung sind weder Name noch Kontaktdaten erforderlich.{" "}
  <Link href="/datenschutz">
    Hinweise zum Datenschutz
  </Link>
</p>







      {formType === "incident" && (
        <section className="form-section">
          <button
            className="back-button"
            type="button"
            onClick={() => selectForm(null)}
          >
            ← Auswahl
          </button>

          <h2>Problem oder Unterstützungsbedarf melden</h2>

          <form onSubmit={handleIncidentSubmit} className="report-form">
            <div className="form-grid">
              <label>
                Wer meldet?
                <select
                  name="reporterRole"
                  value={incidentForm.reporterRole}
                  onChange={handleIncidentChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="schueler">Schüler/in</option>
                  <option value="eltern">Eltern</option>
                  <option value="lehrkraft">Lehrkraft</option>
                  <option value="schulmitarbeiter">
                    Schulmitarbeiter/in
                  </option>
                </select>
              </label>

              <label>
                Schulart
                <select
                  name="schoolType"
                  value={incidentForm.schoolType}
                  onChange={handleIncidentChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="grundschule">Grundschule</option>
                  <option value="mittelschule">Mittelschule</option>
                  <option value="realschule">Realschule</option>
                  <option value="gymnasium">Gymnasium</option>
                </select>
              </label>

              <label>
                Region
                <select
                  name="district"
                  value={incidentForm.district}
                  onChange={handleIncidentChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <DistrictOptions />
                </select>
              </label>

              <label>
                Jahrgangsstufe
                <select
                  name="gradeLevel"
                  value={incidentForm.gradeLevel}
                  onChange={handleIncidentChange}
                >
                  <option value="">Keine Angabe</option>

                  {GRADE_LEVELS.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Kategorie
                <select
                  name="category"
                  value={incidentForm.category}
                  onChange={handleIncidentChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="mobbing">Mobbing</option>
                  <option value="angst">Angst</option>
                  <option value="gewalt">Gewalt</option>
                  <option value="sucht">Sucht</option>
                  <option value="benachteiligung">
                    Benachteiligung
                  </option>
                  <option value="sozialer_konflikt">
                    Sozialer Konflikt
                  </option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </label>

              <label>
                Häufigkeit
                <select
                  name="frequency"
                  value={incidentForm.frequency}
                  onChange={handleIncidentChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="einmalig">Einmalig</option>
                  <option value="wiederholt">Wiederholt</option>
                  <option value="unklar">Unklar</option>
                </select>
              </label>
            </div>

            <label className="form-full">
              Beschreibung
              <textarea
                name="description"
                value={incidentForm.description}
                onChange={handleIncidentChange}
                rows="6"
                minLength="20"
                maxLength="2000"
                required
              />


              <p className="privacy-field-note">
  Bitte keine Namen, Kontaktdaten oder andere Angaben eintragen,
  durch die einzelne Personen identifiziert werden können.
</p>



            </label>

            <button
              className="primary-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Wird gespeichert..."
                : "Meldung absenden"}
            </button>
          </form>
        </section>
      )}

      {formType === "learning" && (
        <section className="form-section">
          <button
            className="back-button"
            type="button"
            onClick={() => selectForm(null)}
          >
            ← Auswahl
          </button>

          <h2>Lernbedarf melden</h2>

          <form onSubmit={handleLearningSubmit} className="report-form">
            <div className="form-grid">
              <label>
                Wer meldet?
                <select
                  name="reporterRole"
                  value={learningForm.reporterRole}
                  onChange={handleLearningChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="schueler">Schüler/in</option>
                  <option value="eltern">Eltern</option>
                  <option value="lehrkraft">Lehrkraft</option>
                  <option value="schulmitarbeiter">
                    Schulmitarbeiter/in
                  </option>
                </select>
              </label>

              <label>
                Schulart
                <select
                  name="schoolType"
                  value={learningForm.schoolType}
                  onChange={handleLearningChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <option value="grundschule">Grundschule</option>
                  <option value="mittelschule">Mittelschule</option>
                  <option value="realschule">Realschule</option>
                  <option value="gymnasium">Gymnasium</option>
                </select>
              </label>

              <label>
                Region
                <select
                  name="district"
                  value={learningForm.district}
                  onChange={handleLearningChange}
                  required
                >
                  <option value="">Bitte auswählen</option>
                  <DistrictOptions />
                </select>
              </label>

              <label>
                Jahrgangsstufe
                <select
                  name="gradeLevel"
                  value={learningForm.gradeLevel}
                  onChange={handleLearningChange}
                >
                  <option value="">Keine Angabe</option>

                  {GRADE_LEVELS.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Fach / Bereich
                <select
                  name="subject"
                  value={learningForm.subject}
                  onChange={handleLearningChange}
                  required
                >
                  <option value="">Bitte auswählen</option>

                  {LEARNING_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Thema
                <input
                  name="topic"
                  value={learningForm.topic}
                  onChange={handleLearningChange}
                  minLength="3"
                  maxLength="150"
                  required
                />
              </label>

              <label>
                Formatwunsch
                <select
                  name="preferredFormat"
                  value={learningForm.preferredFormat}
                  onChange={handleLearningChange}
                >
                  {LEARNING_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {FORMAT_LABELS[format]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-full">
              Bedarf beschreiben
              <textarea
                name="description"
                value={learningForm.description}
                onChange={handleLearningChange}
                rows="6"
                minLength="20"
                maxLength="2000"
                required
              />


              <p className="privacy-field-note">
  Bitte keine Namen, Kontaktdaten oder andere Angaben eintragen,
  durch die einzelne Personen identifiziert werden können.
</p>



            </label>

            <button
              className="primary-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Wird gespeichert..."
                : "Lernbedarf absenden"}
            </button>
          </form>
        </section>
      )}

      {message && <p className="form-message">{message}</p>}
    </main>
  );
}
"use client";

import { useEffect, useState } from "react"
import { getLabel } from "@/lib/labels"

export default function Home() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/dashboard");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Dashboard konnte nicht geladen werden.");
        return;
      }

      setDashboard(data);
    } catch (error) {
      console.error(error);
      setError("Dashboard konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main>
        <p className="state-message">Dashboard wird geladen...</p>
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

  if (!dashboard) {
    return null;
  }

  const maxCategoryCount = Math.max(
    ...dashboard.incidentsByCategory.map((item) => item.count),
    1
  );

  const maxDistrictCount = Math.max(
    ...dashboard.incidentsByDistrict.map((item) => item.count),
    1
  );

  return (
    <main>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Verstehen</h1>
          <p className="page-intro">
            Aktuelle Lage, Bedarfe und Maßnahmen im Überblick.
          </p>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>Lage & Bedarf</h2>
        </div>

        <div className="metric-grid">
          <article className="metric-card">
            <span className="metric-label">Problemmeldungen</span>
            <strong className="metric-value">
              {dashboard.incidentCount}
            </strong>
          </article>

          <article className="metric-card">
            <span className="metric-label">Lernbedarfe</span>
            <strong className="metric-value">
              {dashboard.learningRequestCount}
            </strong>
          </article>

         <article className="metric-card">
  <span className="metric-label">
    Unbearbeitete Problemmeldungen
  </span>
  <strong className="metric-value">
    {dashboard.openIncidentCount}
  </strong>
</article>

<article className="metric-card">
  <span className="metric-label">
    Unbearbeitete Lernbedarfe
  </span>
  <strong className="metric-value">
    {dashboard.openLearningRequestCount}
  </strong>
</article>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="panel-kicker">Problemlage</p>
              <h2>Nach Kategorie</h2>
            </div>
          </div>

          <div className="bar-list">
            {dashboard.incidentsByCategory.map((item) => (
              <div className="bar-item" key={item.category}>
                <div className="bar-meta">
                  <span>{getLabel(item.category)}</span>
                  <strong>{item.count}</strong>
                </div>

                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.count / maxCategoryCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="panel-kicker">Problemlage</p>
              <h2>Nach Landkreis</h2>
            </div>
          </div>

          <div className="bar-list">
            {dashboard.incidentsByDistrict.map((item) => (
              <div className="bar-item" key={item.district}>
                <div className="bar-meta">
                  <span>{item.district}</span>
                  <strong>{item.count}</strong>
                </div>

                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.count / maxDistrictCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-panel subjects-panel">
        <div className="section-heading">
          <div>
            <p className="panel-kicker">Lernbedarf</p>
            <h2>Nach Bereich</h2>
          </div>
        </div>

        <div className="subject-list">
          {dashboard.learningRequestsBySubject.map((item) => (
            <div className="subject-row" key={item.subject}>
              <span>{item.subject}</span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


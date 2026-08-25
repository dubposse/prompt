"use client";

import { useEffect, useState } from "react";
import { getLabel } from "@/lib/labels";

export default function LernenPage() {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/learning-resources");
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Lernressourcen konnten nicht geladen werden."
        );
        return;
      }

      setResources(data);
    } catch (error) {
      console.error(error);
      setError("Lernressourcen konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "Alle",
    ...new Set(resources.map((resource) => resource.category)),
  ];

  const filteredResources =
    selectedCategory === "Alle"
      ? resources
      : resources.filter(
          (resource) => resource.category === selectedCategory
        );

  if (loading) {
    return (
      <main>
        <p className="state-message">
          Lernressourcen werden geladen...
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
          <p className="eyebrow">Ressourcen</p>
          <h1>Lernen</h1>

          <p className="page-intro">
            Interaktive digitale Lernangebote für unterschiedliche Themen und Lernbedarfe.
          </p>
        </div>
      </div>

      <section className="learning-section">
        <div className="section-heading">
          <h2>Lernangebote</h2>

          <span className="resource-count">
            {filteredResources.length} Ressourcen
          </span>
        </div>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "category-filter-button active"
                  : "category-filter-button"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="learning-resource-list">
          {filteredResources.map((resource) => {
            const hasUrl =
              resource.url &&
              resource.url !== "#";

            return (
              <article
                className="learning-resource-card"
                key={resource.id}
              >
                <div className="learning-resource-top">
                  <span className="learning-resource-type">
                    {getLabel(resource.resource_type)}
                  </span>

                  <span className="learning-resource-status">
                    {getLabel(resource.status)}
                  </span>
                </div>

                <h3>{resource.title}</h3>

                <div className="learning-resource-meta">
                  <span>{resource.category}</span>

                  {resource.target_group && (
                    <span>{resource.target_group}</span>
                  )}

                  {resource.grade_level && (
                    <span>
                      Jahrgang {resource.grade_level}
                    </span>
                  )}
                </div>

                <p className="learning-resource-description">
                  {resource.description}
                </p>

                <div className="learning-resource-footer">
                  <span>
                    {getLabel(resource.resource_type)}
                  </span>

                  {hasUrl ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="learning-resource-link"
                    >
                      Ressource öffnen →
                    </a>
                  ) : (
                    <span className="learning-resource-demo">
                      Demo-Ressource
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
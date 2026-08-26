export default function UeberPromptPage() {
  return (
    <main>
      <div className="about-header">
        <p className="eyebrow">Über Prompt</p>

        <h1>Bedarfe erkennen. Maßnahmen verbinden. Lernen ermöglichen.</h1>

        <p className="about-lead">
          Prompt ist ein prototypisches System zur strukturierten Erfassung
          schulischer Problemlagen und Lernbedarfe. Meldungen werden mit
          konkreten Maßnahmen und passenden digitalen Lernressourcen
          verbunden.
        </p>
      </div>

      <section className="about-section">
        <p className="eyebrow">Arbeitsweise</p>

        <div className="about-flow">
          <div>
            <span>01</span>
            <strong>Melden</strong>
            <p>
              Problemlagen und konkrete Lernbedarfe werden strukturiert
              erfasst.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Verstehen</strong>
            <p>
              Die Daten machen Themen, Regionen und wiederkehrende Bedarfe
              sichtbar.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Handeln</strong>
            <p>
              Maßnahmen werden konkreten Problemmeldungen oder Lernbedarfen zugeordnet
              und ihr Bearbeitungsstatus nachvollziehbar gemacht.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Lernen</strong>
            <p>
              Eigene interaktive digitale Lernangebote stehen zentral zur Verfügung. 
              Sie können Maßnahmen zu Problemmeldungen ergänzen und sind bei Lernbedarfen die konkrete Lösung.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <p className="eyebrow">Ein System statt Einzellösungen</p>

        <p className="about-text">
          Der Kern von Prompt ist die Verbindung der Informationen. Eine
          Meldung bleibt nicht nur ein Datensatz und eine Lernressource nicht
          nur ein einzelner Link. Bedarfe, Maßnahmen und Ressourcen können
          miteinander verknüpft und als zusammenhängender Prozess betrachtet
          werden.
        </p>
      </section>

      <section className="about-section">
        <p className="eyebrow">Weitergedacht</p>

        <div className="about-future">
          <h2>Schneller auf neue Situationen reagieren</h2>

          <p>
            Prompt könnte künftig auch kurzfristige Bedarfe unterstützen.
            Wird beispielsweise ein bevorstehender Unterrichtsausfall
            gemeldet, könnten bereits vorhandene und geeignete digitale
            Lernressourcen unmittelbar vorgeschlagen und bereitgestellt
            werden.
          </p>

          <p>
            Eine spätere Automatisierung könnte dabei passende Inhalte anhand
            von Fach, Jahrgangsstufe, Thema und Zielgruppe auswählen. Die
            Entscheidung über die tatsächliche Bereitstellung bleibt dabei
            kontrollierbar.
          </p>
        </div>
      </section>

      <section className="about-section about-project">
        <p className="eyebrow">Projekt</p>

        <p>
          Prompt ist ein Software-Prototyp zur Erprobung datenbasierter
          Abläufe zwischen Meldung, Maßnahme und digitaler Lernressource.
          <br />
          <br />
          Die Anwendung enthält Demo-Datensätze und kann mit eigenen Testdaten ausprobiert werden. 
          Bitte geben Sie keine echten personenbezogenen oder sensiblen Daten ein. Testdaten können
          während des Prototypbetriebs gespeichert, verändert oder wieder gelöscht werden.
        </p>
      </section>
    </main>
  );
}
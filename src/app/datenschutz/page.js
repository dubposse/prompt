export default function DatenschutzPage() {
  return (
    <main>
      <div className="page-header">
        <p className="eyebrow">Rechtliches</p>
        <h1>Datenschutz</h1>

        <p>
          Informationen zur Verarbeitung personenbezogener Daten
          bei der Nutzung dieser Anwendung.
        </p>
      </div>

      <section className="detail-section">
        <p className="eyebrow">Verantwortlicher</p>

        <h2>Verantwortlicher für die Datenverarbeitung</h2>

        <p>
          Matthias Brehm
          <br />
          Nordwestring 89
          <br />
          90419 Nürnberg
        </p>

        <p>
          E-Mail:{" "}
          <a href="mailto:kontakt@matthiasbrehm.de">
            kontakt@matthiasbrehm.de
          </a>
        </p>
      </section>


      <section className="detail-section">
  <p className="eyebrow">Meldedaten</p>

  <h2>Problemmeldungen und Lernbedarfe</h2>

  <p>
    Über die Anwendung können Problemmeldungen und Lernbedarfe
    übermittelt werden. Dabei werden ausschließlich die im
    jeweiligen Formular angegebenen Informationen gespeichert.
  </p>

  <p>
    Hierzu können insbesondere die Rolle der meldenden Person,
    Schulart, Landkreis, Jahrgangsstufe, Kategorie beziehungsweise
    Fach oder Bereich, Thema, Beschreibung, Häufigkeit und
    gewünschtes Lernformat gehören.
  </p>

  <p>
    Für eine Meldung sind weder Name noch Kontaktdaten erforderlich.
    Die Anwendung speichert keine IP-Adresse zusammen mit einer
    Problemmeldung oder einem Lernbedarf.
  </p>

  <p>
    Bitte tragen Sie in Freitextfeldern keine Namen, Kontaktdaten
    oder andere Angaben ein, durch die einzelne Personen
    identifiziert werden können.
  </p>
</section>


<section className="detail-section">
  <p className="eyebrow">Speicherdauer</p>

  <h2>Zweck und Dauer der Speicherung</h2>

  <p>
    Die Anwendung dient derzeit der Erprobung und Demonstration
    eines Prototyps zur strukturierten Erfassung von
    Problemmeldungen und Lernbedarfen sowie zur Planung
    entsprechender Maßnahmen und Lernangebote.
  </p>

  <p>
    Problemmeldungen und Lernbedarfe werden unabhängig von ihrem
    Bearbeitungsstatus höchstens zwölf Monate gespeichert. Eine
    frühere Löschung erfolgt, wenn die Daten für die Erprobung und
    Demonstration des Prototyps nicht mehr benötigt werden.
  </p>
</section>


<section className="detail-section">
  <p className="eyebrow">Hosting</p>

  <h2>Bereitstellung über Vercel</h2>

  <p>
    Diese Anwendung wird über Vercel bereitgestellt. Beim Aufruf
    der Anwendung werden technisch erforderliche Verbindungs- und
    Zugriffsdaten verarbeitet. Hierzu können insbesondere die
    IP-Adresse des verwendeten Geräts sowie technische Informationen
    zum jeweiligen Seitenaufruf gehören.
  </p>

  <p>
    Diese Verarbeitung erfolgt zur sicheren, stabilen und
    zuverlässigen Bereitstellung der Anwendung. Die Anwendung selbst
    speichert die IP-Adresse nicht zusammen mit einer
    Problemmeldung oder einem Lernbedarf.
  </p>

  <p>
    Weitere Informationen zur Datenverarbeitung durch Vercel finden
    Sie in der{" "}
    <a
      href="https://vercel.com/legal/privacy-policy"
      target="_blank"
      rel="noreferrer"
    >
      Datenschutzerklärung von Vercel
    </a>.
  </p>
</section>

<section className="detail-section">
  <p className="eyebrow">Datenbank</p>

  <h2>Datenspeicherung über Neon</h2>

  <p>
    Für die Speicherung der Anwendungsdaten wird eine
    PostgreSQL-Datenbank des Anbieters Neon verwendet. Die für
    dieses Projekt verwendete Datenbank wird in der AWS-Region
    Europa (Frankfurt) betrieben.
  </p>

  <p>
    In der Datenbank werden die über die Anwendung erfassten
    fachlichen Daten gespeichert. Die Anwendung übermittelt die
    IP-Adresse eines Websitebesuchers nicht als Bestandteil einer
    Problemmeldung oder eines Lernbedarfs an die Datenbank.
  </p>

  <p>
    Weitere Informationen zum Datenschutz und zur Sicherheit bei
    Neon finden Sie auf der{" "}
    <a
      href="https://neon.com/security"
      target="_blank"
      rel="noreferrer"
    >
      Sicherheits- und Datenschutzseite von Neon
    </a>.
  </p>
</section>


<section className="detail-section">
  <p className="eyebrow">Rechtsgrundlage</p>

  <h2>Rechtsgrundlage der Verarbeitung</h2>

  <p>
    Soweit bei der Nutzung der Anwendung personenbezogene Daten
    verarbeitet werden, erfolgt die Verarbeitung auf Grundlage
    von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse
    besteht in der technischen Bereitstellung, Erprobung und
    Demonstration des Prototyps sowie in der Gewährleistung
    eines sicheren und zuverlässigen Betriebs.
  </p>

  <p>
    Die Anwendung ist ein Prototyp und kein offizielles
    Meldesystem einer Schule, Behörde oder sonstigen öffentlichen
    Einrichtung.
  </p>
</section>


<section className="detail-section">
  <p className="eyebrow">Ihre Rechte</p>

  <h2>Rechte betroffener Personen</h2>

  <p>
    Betroffene Personen haben nach Maßgabe der gesetzlichen
    Voraussetzungen insbesondere das Recht auf Auskunft,
    Berichtigung, Löschung, Einschränkung der Verarbeitung und
    Widerspruch gegen die Verarbeitung ihrer personenbezogenen
    Daten.
  </p>

  <p>
    Außerdem besteht das Recht, sich bei einer zuständigen
    Datenschutzaufsichtsbehörde zu beschweren.
  </p>

  <p>
    Fragen zum Datenschutz oder Anfragen zur Wahrnehmung Ihrer
    Rechte können an die oben angegebene E-Mail-Adresse gerichtet
    werden.
  </p>
</section>



    </main>
  );
}


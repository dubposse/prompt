# Prompt

**Prompt** ist ein Fullstack-Software-Prototyp zur strukturierten Verbindung von Problemlagen, Lernbedarfen, Maßnahmen und digitalen Lernressourcen im schulischen Kontext.

Das Projekt untersucht, wie Informationen, die an unterschiedlichen Stellen entstehen, in einem gemeinsamen digitalen Prozess zusammengeführt und für weitere Maßnahmen nutzbar gemacht werden können.

## Idee und Motivation

Im schulischen Umfeld treffen unterschiedliche Probleme und Bedarfe auf verschiedene Ansprechpartner, vorhandene Ressourcen und mögliche Maßnahmen.

Die Ausgangsfrage für Prompt war:

**Wie lassen sich diese Informationen technisch als zusammenhängender Prozess abbilden?**

Prompt ist dabei ausdrücklich kein fertiges Konzept für bayerische Schulen und bildet keine bestehenden Verwaltungs- oder Schulprozesse vollständig ab.

Der Prototyp dient vielmehr dazu, eine mögliche Struktur praktisch und technisch zu erproben.

Fachliche und pädagogische Anforderungen müssten in einer realen Anwendung gemeinsam mit den entsprechenden Fachleuten analysiert und weiterentwickelt werden.

## Grundidee

Der vereinfachte Prozess von Prompt besteht aus vier Bereichen:

**Melden → Verstehen → Handeln → Lernen**

### Melden

Problemmeldungen und Lernbedarfe können strukturiert erfasst werden.

Dazu gehören unter anderem Informationen zu:

- Landkreis
- Schulart
- Jahrgangsstufe
- meldender Personengruppe
- Problemkategorie bzw. Fach
- Beschreibung und weiteren Kontextinformationen

### Verstehen

Die erfassten Daten werden zusammengeführt und in einer Übersicht dargestellt.

Dadurch können beispielsweise wiederkehrende Problemlagen, Kategorien und Lernbedarfe sichtbar gemacht werden.

### Handeln

Offene Problemmeldungen und Lernbedarfe können ausgewählt und mit konkreten Maßnahmen verbunden werden.

Maßnahmen besitzen einen eigenen Bearbeitungsstatus und können im weiteren Verlauf ergänzt und aktualisiert werden.

### Lernen

Für Lernbedarfe können digitale Lernressourcen hinterlegt und bestehenden Maßnahmen zugeordnet werden.

Dadurch entsteht ein vereinfachter Zusammenhang zwischen:

**Bedarf → Maßnahme → Ressource**

## Technische Umsetzung

Prompt wurde als Fullstack-Webanwendung mit dem Next.js App Router entwickelt.

Verwendete Technologien und Konzepte:

- Next.js
- React
- JavaScript
- Node.js
- REST-API-Endpunkte
- PostgreSQL
- Neon
- Vercel
- React State und clientseitiges Fetching
- dynamische und statische Routen
- serverseitige Datenbankzugriffe

Die Anwendung besitzt getrennte API-Endpunkte für Problemmeldungen, Lernbedarfe, Maßnahmen, Lernressourcen und Dashboard-Daten.

Die Daten werden persistent in einer PostgreSQL-Datenbank gespeichert.

## Datenmodell

Der Prototyp arbeitet im Kern mit miteinander verbundenen Datenbereichen für:

- Problemmeldungen
- Lernbedarfe
- Maßnahmen
- Lernressourcen
- Zuordnungen zwischen Maßnahmen und Ressourcen

Dadurch können einzelne Meldungen nicht nur gespeichert, sondern im weiteren Prozess mit daraus entstehenden Maßnahmen und Ressourcen verbunden werden.

## Demo und Testbetrieb

Prompt ist ein öffentlich zugänglicher Software-Prototyp.

Die Anwendung enthält Demo-Datensätze und kann mit eigenen Testdaten ausprobiert werden.

Bitte keine echten personenbezogenen oder sensiblen Daten eingeben.

Testdaten können während des Prototypbetriebs gespeichert, verändert oder wieder gelöscht werden.

## Projektstatus

Prompt ist eine Arbeitsprobe und ein experimenteller Prototyp.

Im Mittelpunkt stehen nicht die vollständige Abbildung realer schulischer Strukturen oder ein produktionsreifes Fachverfahren, sondern insbesondere:

- Analyse eines realen Problemfeldes
- Strukturierung von Informationen und Abläufen
- Modellierung zusammenhängender Daten
- Übersetzung eines Prozessgedankens in eine funktionierende Webanwendung
- Fullstack-Umsetzung vom Frontend über API-Endpunkte bis zur Datenbank

Eine reale Weiterentwicklung würde insbesondere eine detaillierte fachliche Analyse mit Personen aus Pädagogik, Verwaltung, IT und weiteren beteiligten Bereichen voraussetzen.

## Live-Demo

**Prompt:**  
https://prompt-kappa-kohl.vercel.app/

## Lizenz

Dieses Projekt steht unter der **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Weitere Informationen befinden sich in der Datei `LICENSE`.

## Autor

**Matthias Brehm**

Fullstack-Webentwicklung · Next.js · React · JavaScript · PostgreSQL

const LABELS = {
  // Rollen
  schueler: "Schüler/in",
  eltern: "Eltern",
  lehrkraft: "Lehrkraft",
  schulmitarbeiter: "Schulmitarbeiter/in",

  // Schularten
  grundschule: "Grundschule",
  mittelschule: "Mittelschule",
  realschule: "Realschule",
  gymnasium: "Gymnasium",

  // Kategorien
  mobbing: "Mobbing",
  angst: "Angst",
  gewalt: "Gewalt",
  sucht: "Sucht",
  benachteiligung: "Benachteiligung",
  sozialer_konflikt: "Sozialer Konflikt",
  sonstiges: "Sonstiges",

  // Häufigkeit
  einmalig: "Einmalig",
  wiederholt: "Wiederholt",
  unklar: "Unklar",

  // Formatwünsche
  offen: "Offen",
  microlearning: "Microlearning",
  quiz: "Quiz",
  simulation: "Simulation",
  mix: "Mix",

  // Maßnahmentypen
  workshop: "Workshop",
  beratung: "Beratung",
  gespraech: "Gespräch",
  vermittlung: "Vermittlung",
  micro_app: "Micro-App",
  lernangebot: "Lernangebot",

  // Status
  neu: "Neu",
  geplant: "Geplant",
  priorisiert: "Priorisiert",
  in_bearbeitung: "In Bearbeitung",
  bereitgestellt: "Bereitgestellt",
  abgeschlossen: "Abgeschlossen",
};

export function getLabel(value) {
  if (!value) {
    return "";
  }

  if (LABELS[value]) {
    return LABELS[value];
  }

  return value
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}
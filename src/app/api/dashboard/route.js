import pool from "@/lib/db";

export async function GET() {
  try {
    // Gesamtzahl der Problemmeldungen
    const incidents = await pool.query(`
      SELECT COUNT(*)
      FROM incident_reports
    `);

    // Gesamtzahl der Lernbedarfe
    const learningRequests = await pool.query(`
      SELECT COUNT(*)
      FROM learning_requests
    `);

    // Maßnahmen, die noch nicht abgeschlossen sind
    const openIncidents = await pool.query(`
  SELECT COUNT(*)
  FROM incident_reports ir
  WHERE NOT EXISTS (
    SELECT 1
    FROM measures m
    WHERE m.incident_report_id = ir.id
  )
`);

    // Gesamtzahl der Lernressourcen
    const openLearningRequests = await pool.query(`
  SELECT COUNT(*)
  FROM learning_requests lr
  WHERE NOT EXISTS (
    SELECT 1
    FROM measures m
    WHERE m.learning_request_id = lr.id
  )
`);

    // Problemmeldungen nach Kategorie
    const incidentsByCategory = await pool.query(`
      SELECT category, COUNT(*)
      FROM incident_reports
      GROUP BY category
      ORDER BY COUNT(*) DESC
    `);

    // Problemmeldungen nach Landkreis
    const incidentsByDistrict = await pool.query(`
      SELECT district, COUNT(*)
      FROM incident_reports
      GROUP BY district
      ORDER BY COUNT(*) DESC
    `);

    // Lernbedarfe nach Fach / Bereich
    const learningRequestsBySubject = await pool.query(`
      SELECT subject, COUNT(*)
      FROM learning_requests
      GROUP BY subject
      ORDER BY COUNT(*) DESC
    `);

    return Response.json({
      incidentCount: Number(incidents.rows[0].count),
      learningRequestCount: Number(learningRequests.rows[0].count),
      openIncidentCount: Number(openIncidents.rows[0].count),
      openLearningRequestCount: Number(openLearningRequests.rows[0].count),

      incidentsByCategory: incidentsByCategory.rows.map((item) => ({
        ...item,
        count: Number(item.count),
      })),

      incidentsByDistrict: incidentsByDistrict.rows.map((item) => ({
        ...item,
        count: Number(item.count),
      })),

      learningRequestsBySubject: learningRequestsBySubject.rows.map(
        (item) => ({
          ...item,
          count: Number(item.count),
        })
      ),
    });
  } catch (error) {
    console.error("GET /api/dashboard:", error);

    return Response.json(
      { error: "Dashboard-Daten konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
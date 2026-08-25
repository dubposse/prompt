import pool from "@/lib/db";

const INCIDENT_MEASURE_TYPES = [
  "praeventionsbesuch",
  "veranstaltung",
  "sonstiges",
];

const LEARNING_MEASURE_TYPES = [
  "micro_app",
];


export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        m.id,
        m.title,
        m.description,
        m.measure_type,
        m.status,
        m.scheduled_at,
        m.created_at,

        ir.id AS incident_id,
        ir.category AS incident_category,
        ir.district AS incident_district,
        ir.school_type AS incident_school_type,
        ir.grade_level AS incident_grade_level,

        lr.id AS learning_request_id,
        lr.subject AS learning_subject,
        lr.topic AS learning_topic,
        lr.district AS learning_district,
        lr.school_type AS learning_school_type,
        lr.grade_level AS learning_grade_level

      FROM measures m

      LEFT JOIN incident_reports ir
        ON m.incident_report_id = ir.id

      LEFT JOIN learning_requests lr
        ON m.learning_request_id = lr.id

      ORDER BY m.created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Maßnahmen konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      incidentReportId,
      learningRequestId,
      measureType,
      title,
      description,
      scheduledAt,
    } = body;

    if (!measureType || !title) {
      return Response.json(
        { error: "Pflichtfelder fehlen." },
        { status: 400 }
      );
    }

    if (!incidentReportId && !learningRequestId) {
      return Response.json(
        { error: "Es wurde kein Fall ausgewählt." },
        { status: 400 }
      );
    }

    if (incidentReportId && learningRequestId) {
      return Response.json(
        { error: "Eine Maßnahme kann nur einem Fall zugeordnet werden." },
        { status: 400 }
      );
    }

    if (
  incidentReportId &&
  !INCIDENT_MEASURE_TYPES.includes(measureType)
) {
  return Response.json(
    {
      error:
        "Ungültiger Maßnahmentyp für eine Problemmeldung.",
    },
    { status: 400 }
  );
}

if (
  learningRequestId &&
  !LEARNING_MEASURE_TYPES.includes(measureType)
) {
  return Response.json(
    {
      error:
        "Ungültiger Maßnahmentyp für einen Lernbedarf.",
    },
    { status: 400 }
  );
}



    const result = await pool.query(
      `
      INSERT INTO measures (
        incident_report_id,
        learning_request_id,
        measure_type,
        title,
        description,
        scheduled_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        incidentReportId || null,
        learningRequestId || null,
        measureType,
        title.trim(),
        description.trim() || null,
        scheduledAt || null,
      ]
    );

    return Response.json(
      result.rows[0],
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Maßnahme konnte nicht angelegt werden." },
      { status: 500 }
    );
  }
}
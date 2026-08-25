import pool from "@/lib/db"

export async function GET(request, context) {

  try {
    const { id } = await context.params;

    const measureId = Number(id);

    if (!Number.isInteger(measureId) || measureId <= 0) {
      return Response.json(
        { error: "Ungültige Maßnahmen-ID." },
        { status: 400 }
      );
    }

    const measureResult = await pool.query(
      `
      SELECT
        m.id,
        m.title,
        m.description,
        m.measure_type,
        m.status,
        m.scheduled_at,
        m.created_at,

        ir.id AS incident_id,
        ir.reporter_role AS incident_reporter_role,
        ir.school_type AS incident_school_type,
        ir.district AS incident_district,
        ir.grade_level AS incident_grade_level,
        ir.category AS incident_category,
        ir.description AS incident_description,
        ir.frequency AS incident_frequency,

        lr.id AS learning_request_id,
        lr.reporter_role AS learning_reporter_role,
        lr.school_type AS learning_school_type,
        lr.district AS learning_district,
        lr.grade_level AS learning_grade_level,
        lr.subject AS learning_subject,
        lr.topic AS learning_topic,
        lr.description AS learning_description,
        lr.preferred_format AS learning_preferred_format

      FROM measures m

      LEFT JOIN incident_reports ir
        ON m.incident_report_id = ir.id

      LEFT JOIN learning_requests lr
        ON m.learning_request_id = lr.id

      WHERE m.id = $1
      `,
      [measureId]
    );

    if (measureResult.rows.length === 0) {
      return Response.json(
        { error: "Maßnahme nicht gefunden." },
        { status: 404 }
      );
    }

    const resourcesResult = await pool.query(
      `
      SELECT
        lr.*
      FROM learning_resources lr

      JOIN measure_resources mr
        ON mr.resource_id = lr.id

      WHERE mr.measure_id = $1

      ORDER BY lr.id
      `,
      [measureId]
    );

    return Response.json({
      measure: measureResult.rows[0],
      resources: resourcesResult.rows,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Maßnahme konnte nicht geladen werden." },
      { status: 500 }
    );
  }
}


export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const measureId = Number(id);

    if (!Number.isInteger(measureId) || measureId <= 0) {
      return Response.json(
        { error: "Ungültige Maßnahmen-ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, scheduledAt } = body;

    const ALLOWED_STATUSES = [
      "geplant",
      "priorisiert",
      "in_bearbeitung",
      "bereitgestellt",
      "abgeschlossen",
    ];

   if (status && !ALLOWED_STATUSES.includes(status)) {
  return Response.json(
    { error: "Ungültiger Status." },
    { status: 400 }
  );
}

if (
  scheduledAt !== undefined &&
  scheduledAt !== null &&
  Number.isNaN(Date.parse(scheduledAt))
) {
  return Response.json(
    { error: "Ungültiger Termin." },
    { status: 400 }
  );
}


let result; 

   if (scheduledAt !== undefined) {
  result = await pool.query(
    `
    UPDATE measures
    SET scheduled_at = $1
    WHERE id = $2
    RETURNING *
    `,
    [scheduledAt, measureId]
  );
} else {
  result = await pool.query(
    `
    UPDATE measures
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, measureId]
  );
}

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Maßnahme nicht gefunden." },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Status konnte nicht geändert werden." },
      { status: 500 }
    );
  }
}
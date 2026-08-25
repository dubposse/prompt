import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT ir.*
      FROM incident_reports ir

      WHERE NOT EXISTS (
        SELECT 1
        FROM measures m
        WHERE m.incident_report_id = ir.id
      )

      ORDER BY ir.created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Offene Problemmeldungen konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
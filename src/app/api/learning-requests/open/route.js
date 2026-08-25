import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT lr.*
      FROM learning_requests lr

      WHERE NOT EXISTS (
        SELECT 1
        FROM measures m
        WHERE m.learning_request_id = lr.id
      )

      ORDER BY lr.created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Offene Lernbedarfe konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
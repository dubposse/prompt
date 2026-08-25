import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        resource_type,
        category,
        target_group,
        grade_level,
        description,
        url,
        status,
        created_at
      FROM learning_resources
      ORDER BY title ASC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Lernressourcen konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
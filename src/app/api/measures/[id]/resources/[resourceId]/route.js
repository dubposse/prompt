import pool from "@/lib/db";

export async function DELETE(request, context) {
  try {
    const { id, resourceId } = await context.params;

    const measureId = Number(id);
    const resourceIdNumber = Number(resourceId);

    if (
      !Number.isInteger(measureId) ||
      measureId <= 0 ||
      !Number.isInteger(resourceIdNumber) ||
      resourceIdNumber <= 0
    ) {
      return Response.json(
        { error: "Ungültige ID." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      DELETE FROM measure_resources
      WHERE measure_id = $1
        AND resource_id = $2
      RETURNING *
      `,
      [measureId, resourceIdNumber]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Verknüpfung nicht gefunden." },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Verknüpfung konnte nicht entfernt werden." },
      { status: 500 }
    );
  }
}
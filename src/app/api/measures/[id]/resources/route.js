import pool from "@/lib/db";

export async function POST(request, context) {
    
  try {
    const { id } = await context.params;
    const measureId = Number(id);

    const body = await request.json();
    const resourceId = Number(body.resourceId);

    if (!Number.isInteger(measureId) || measureId <= 0) {
      return Response.json(
        { error: "Ungültige Maßnahmen-ID." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(resourceId) || resourceId <= 0) {
      return Response.json(
        { error: "Ungültige Ressourcen-ID." },
        { status: 400 }
      );
    }

  // Check if the measure exists
    const measureResult = await pool.query(
  `
  SELECT id
  FROM measures
  WHERE id = $1
  `,
  [measureId]
);


if (measureResult.rows.length === 0) {
  return Response.json(
    { error: "Maßnahme nicht gefunden." },
    { status: 404 }
  );
}

// Check if the resource exists
const resourceResult = await pool.query(
  `
  SELECT id
  FROM learning_resources
  WHERE id = $1
  `,
  [resourceId]
);

if (resourceResult.rows.length === 0) {
  return Response.json(
    { error: "Ressource nicht gefunden." },
    { status: 404 }
  );
}

//  Link the resource to the measure
    const result = await pool.query(
      `
      INSERT INTO measure_resources (
        measure_id,
        resource_id
      )
      VALUES ($1, $2)
      RETURNING *
      `,
      [measureId, resourceId]
    );

    return Response.json(
      result.rows[0],
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Ressource konnte nicht verknüpft werden." },
      { status: 500 }
    );
  }
}
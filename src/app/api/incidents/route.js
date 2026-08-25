import pool from "@/lib/db";
import { BAVARIAN_DISTRICTS } from "@/lib/bavaria";

const ALLOWED_REPORTER_ROLES = [
  "schueler",
  "eltern",
  "lehrkraft",
  "schulmitarbeiter",
];

const ALLOWED_SCHOOL_TYPES = [
  "grundschule",
  "mittelschule",
  "realschule",
  "gymnasium",
];

const ALLOWED_CATEGORIES = [
  "mobbing",
  "angst",
  "gewalt",
  "sucht",
  "benachteiligung",
  "sozialer_konflikt",
  "sonstiges",
];

const ALLOWED_FREQUENCIES = [
  "einmalig",
  "wiederholt",
  "unklar",
];

const ALLOWED_GRADE_LEVELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM incident_reports
      ORDER BY created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Meldungen konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      reporterRole,
      schoolType,
      district,
      gradeLevel,
      category,
      description,
      frequency,
    } = body;

    if (
      !reporterRole ||
      !schoolType ||
      !district ||
      !category ||
      !description ||
      !frequency
    ) {
      return Response.json(
        { error: "Pflichtfelder fehlen." },
        { status: 400 }
      );
    }

    if (!ALLOWED_REPORTER_ROLES.includes(reporterRole)) {
      return Response.json(
        { error: "Ungültige meldende Person." },
        { status: 400 }
      );
    }

    if (!ALLOWED_SCHOOL_TYPES.includes(schoolType)) {
      return Response.json(
        { error: "Ungültige Schulart." },
        { status: 400 }
      );
    }

    if (!BAVARIAN_DISTRICTS.includes(district)) {
      return Response.json(
        { error: "Ungültige Region." },
        { status: 400 }
      );
    }

    if (
      gradeLevel &&
      !ALLOWED_GRADE_LEVELS.includes(gradeLevel)
    ) {
      return Response.json(
        { error: "Ungültige Jahrgangsstufe." },
        { status: 400 }
      );
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return Response.json(
        { error: "Ungültige Kategorie." },
        { status: 400 }
      );
    }

    if (!ALLOWED_FREQUENCIES.includes(frequency)) {
      return Response.json(
        { error: "Ungültige Häufigkeit." },
        { status: 400 }
      );
    }

    const cleanDescription = description.trim();

    if (cleanDescription.length < 20) {
      return Response.json(
        {
          error:
            "Die Beschreibung muss mindestens 20 Zeichen enthalten.",
        },
        { status: 400 }
      );
    }

    if (cleanDescription.length > 2000) {
      return Response.json(
        {
          error:
            "Die Beschreibung darf maximal 2000 Zeichen enthalten.",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO incident_reports
        (
          reporter_role,
          school_type,
          district,
          grade_level,
          category,
          description,
          frequency
        )
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        reporterRole,
        schoolType,
        district,
        gradeLevel || null,
        category,
        cleanDescription,
        frequency,
      ]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Meldung konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
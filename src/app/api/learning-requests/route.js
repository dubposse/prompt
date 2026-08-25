import pool from "@/lib/db";
import { BAVARIAN_DISTRICTS } from "@/lib/bavaria";
import {
  LEARNING_SUBJECTS,
  LEARNING_FORMATS,
} from "@/lib/learning";

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
      FROM learning_requests
      ORDER BY created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Lernbedarfe konnten nicht geladen werden." },
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
      subject,
      topic,
      description,
      preferredFormat,
    } = body;

    // Pflichtfelder
    if (
      !reporterRole ||
      !schoolType ||
      !district ||
      !subject ||
      !topic ||
      !description
    ) {
      return Response.json(
        { error: "Pflichtfelder fehlen." },
        { status: 400 }
      );
    }

    // Meldende Person
    if (!ALLOWED_REPORTER_ROLES.includes(reporterRole)) {
      return Response.json(
        { error: "Ungültige meldende Person." },
        { status: 400 }
      );
    }

    // Schulart
    if (!ALLOWED_SCHOOL_TYPES.includes(schoolType)) {
      return Response.json(
        { error: "Ungültige Schulart." },
        { status: 400 }
      );
    }

    // Region
    if (!BAVARIAN_DISTRICTS.includes(district)) {
      return Response.json(
        { error: "Ungültige Region." },
        { status: 400 }
      );
    }

    // Jahrgangsstufe ist optional
    if (
      gradeLevel &&
      !ALLOWED_GRADE_LEVELS.includes(gradeLevel)
    ) {
      return Response.json(
        { error: "Ungültige Jahrgangsstufe." },
        { status: 400 }
      );
    }

    // Fach / Bereich
    if (!LEARNING_SUBJECTS.includes(subject)) {
      return Response.json(
        { error: "Ungültiges Fach oder ungültiger Bereich." },
        { status: 400 }
      );
    }

    // Format
    if (
      !preferredFormat ||
      !LEARNING_FORMATS.includes(preferredFormat)
    ) {
      return Response.json(
        { error: "Ungültiger Formatwunsch." },
        { status: 400 }
      );
    }

    const cleanTopic = topic.trim();
    const cleanDescription = description.trim();

    // Konkretes Thema
    if (cleanTopic.length < 3) {
      return Response.json(
        { error: "Das Thema muss mindestens 3 Zeichen enthalten." },
        { status: 400 }
      );
    }

    if (cleanTopic.length > 150) {
      return Response.json(
        { error: "Das Thema darf maximal 150 Zeichen enthalten." },
        { status: 400 }
      );
    }

    // Beschreibung
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
      `INSERT INTO learning_requests
        (
          reporter_role,
          school_type,
          district,
          grade_level,
          subject,
          topic,
          description,
          preferred_format
        )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        reporterRole,
        schoolType,
        district,
        gradeLevel || null,
        subject,
        cleanTopic,
        cleanDescription,
        preferredFormat,
      ]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Lernbedarf konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
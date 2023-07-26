const connection = require("../database/connection");
const {
  getCurrentTimestamp,
  nullConversion,
  nullOrInt,
} = require("../utils/StringUtils");

async function getEnrollments(id) {
  try {
    const q = `
    SELECT * FROM enrollments
      WHERE student_id = ${id}
      ORDER BY enrollment_date DESC
    `;
    const result = await connection(q);
    return result;
  } catch (error) {
    return [];
  }
}
async function createEnrollmentRequest(
  student_id,
  grade_level,
  school_year,
  track,
  strand,
  semester,
  enrollment_types
) {
  try {
    const q = `
      INSERT INTO enrollments(student_id, grade_level, school_year, track, strand, semester, enrollment_types, enrollment_date, updated_at, status) 
      VALUES
      (
        ${student_id},
        ${grade_level},
        '${school_year}',
          ${strand ? `'${strand}'` : "NULL"},
        ${track ? `'${track}'` : "NULL"},
        ${nullOrInt(semester)},
        '${enrollment_types}',
        '${getCurrentTimestamp()}',
        NULL,
        ${0}
      );
    `;
    await connection(q);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function cancelEnrollment(enrollment_id) {
  try {
    const q = `
        UPDATE enrollments
            SET status = 2
    WHERE id = ${enrollment_id};
    `;
    await connection(q);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateEnrollmentStatus(enrollment_id, status) {
  try {
    const q = `
        UPDATE enrollments
            SET status = "${status}"
    WHERE id = ${enrollment_id};
    `;
    await connection(q);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getAllEnrollment() {
  try {
    const q = `
    SELECT
      e.id,
      e.student_id,
      e.grade_level,
      e.school_year,
      e.track,
      e.strand,
      e.semester,
      e.enrollment_date,
      e.updated_at,
      e.enrollment_types,
      e.status,
  CASE
    WHEN COUNT(es.id) > 0 THEN JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', s.id,
        'name', s.name,
        'code', s.code,
        'unit', s.unit,
        'teacher_id', s.teacher_id,
        'created_at', s.created_at,
        'updated_at', s.updated_at
      )
    )
    ELSE NULL
  END AS enrolled_subjects
FROM 
  enrollments AS e
LEFT JOIN enrolled_subjects AS es ON es.enrollment_id = e.id
LEFT JOIN subjects AS s ON s.id = es.subject_id
GROUP BY
  e.id;
    `;
    const result = await connection(q);
    return result;
  } catch (error) {
    return [];
  }
}

module.exports = {
  getEnrollments,
  createEnrollmentRequest,
  cancelEnrollment,
  getAllEnrollment,
  updateEnrollmentStatus,
};

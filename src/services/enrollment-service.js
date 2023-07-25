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
    const q = "SELECT * FROM enrollments";
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

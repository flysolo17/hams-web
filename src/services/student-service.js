const connection = require("../database/connection");
const {
  getCurrentTimestamp,
  convertJSDateToSqlDate,
} = require("../utils/StringUtils");
const { hashPassword } = require("../security/encryption");
const { ResponseDataBuilder } = require("../models/ResponseData");
async function insertStudent(data) {
  const { lrn, first_name, middle_name, last_name, gender, password } = data;

  try {
    const hash = await hashPassword(password);
    const q = `
  INSERT INTO students (lrn,first_name,middle_name,last_name,gender,created_at,password) VALUES
  ('${lrn}','${first_name}','${middle_name}','${last_name}',${gender},'${getCurrentTimestamp()}','${hash}');
  `;
    const result = await connection(q);
    return new ResponseDataBuilder()
      .setSuccess(true)
      .setMessage("Successfully Created!")
      .setData(result["insertId"])
      .build();
  } catch (error) {
    console.log(error);
    return new ResponseDataBuilder()
      .setSuccess(false)
      .setMessage(error["sqlMessage"])
      .setError(error["code"])
      .build();
  }
}

async function createContact(data) {
  const { student_id, first_name, middle_name, last_name, phone, type } = data;
  try {
    const q = `
  CALL CreateContacts
  (
    ${student_id},
    '${first_name}',
    '${middle_name}',
    '${last_name}',
    '${phone}',
    ${type}
    );
  `;
    const result = await connection(q);
    return result[0];
  } catch (error) {
    return [];
  }
}

async function createAddress(data) {
  const {
    student_id,
    house_no,
    street,
    barangay,
    municipality,
    province,
    country,
    zip_code,
    type,
  } = data;
  try {
    const q = `
    CALL CreateAddress
  (${student_id},
    ${house_no},
    '${street}',
    '${barangay}',
    '${municipality}',
    '${province}',
    '${country}',
    '${zip_code}',
    ${type}
    );
  `;
    const result = await connection(q);

    return result[0];
  } catch (error) {
    return [];
  }
}

async function signInWithLrnAndPassword(lrn) {
  try {
    const query =
      `SELECT * ` +
      `FROM ` +
      `students ` +
      `WHERE ` +
      `lrn = '${lrn}' ` +
      `LIMIT 1;`;
    const result = await connection(query);
    if (result.length != 0) {
      return result[0];
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getStudentInfo(id) {
  try {
    const query = `CALL GetStudentInfo(${id})`;
    const result = await connection(query);
    if (result.length != 0) {
      return result[0];
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateBirthday(birthDate, student_id) {
  try {
    const q = `
      UPDATE students
      SET birth_date = '${birthDate}'
      WHERE id = ${student_id}
    `;
    await connection(q);
    return true;
  } catch (error) {
    return false;
  }
}
async function updateProfile(path, student_id) {
  try {
    const q = `
      UPDATE students
      SET profile = '${path}'
      WHERE id = ${student_id}
    `;
    await connection(q);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateStudentInfo(data) {
  const {
    id,
    email,
    first_name,
    middle_name,
    last_name,
    extension_name,
    gender,
    nationality,
  } = data;
  try {
    const q = `
      UPDATE students 
      SET 
      email= '${email}',
      first_name='${first_name}',
      middle_name= '${middle_name}',
      last_name= '${last_name}',
      extension_name=  ${extension_name ? `'${extension_name}'` : "NULL"},
      gender = ${gender},
      nationality = '${nationality}'
      WHERE id = ${id};
    `;
    await connection(q);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  insertStudent,
  createContact,
  createAddress,
  signInWithLrnAndPassword,
  getStudentInfo,
  updateBirthday,
  updateProfile,
  updateStudentInfo,
};

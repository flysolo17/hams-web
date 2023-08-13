const connection = require("../database/connection");
const { ResponseDataBuilder } = require("../models/ResponseData");
const { getCurrentTimestamp } = require("../utils/StringUtils");

async function addSubject(name, code, teacher_id) {
  try {
    const q =
      `INSERT INTO subjects ` +
      `VALUES ` +
      `(NULL,'${name}','${code}','${teacher_id}','${getCurrentTimestamp()}',NULL);`;

    const result = await connection(q);
    const build = new ResponseDataBuilder();
    build
      .setSuccess(true)
      .setMessage("Successfully Added!")
      .setData(result["insertId"])
      .build();
    return build;
  } catch (err) {
    const build = new ResponseDataBuilder();
    build
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
    return build;
  }
}

async function deleteSubject(id) {
  try {
    const q = `DELETE FROM subjects ` + `WHERE ` + `id = ${id};`;
    await connection(q);
    return true;
  } catch (err) {
    return false;
  }
}

async function updateSubject(id, name, code, teacher_id) {
  try {
    const q =
      `UPDATE subjects SET ` +
      `name = '${name}', ` +
      `code = '${code}', ` +
      `teacher_id = '${teacher_id}', ` +
      `updated_at = '${getCurrentTimestamp()}' ` +
      `WHERE ` +
      `id = ${id}`;
    await connection(q);
    const build = new ResponseDataBuilder();
    build.setSuccess(true).setMessage("Successfully Updated!").build();
    return build;
  } catch (err) {
    const build = new ResponseDataBuilder();
    build
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
    return build;
  }
}
async function getAllSubjects() {
  try {
    const q = `
  SELECT
    s.id,
    s.name,
    s.code,
    s.created_at,
    s.updated_at,
    u.id AS teacher_id,
    u.name AS teacher,
    g.name AS gender,
    u.profile
  FROM
    subjects AS s
    JOIN users AS u ON u.id = s.teacher_id
    JOIN gender AS g ON g.id = u.gender
  ORDER BY
    s.created_at DESC
`;
    const result = await connection(q);
    const build = new ResponseDataBuilder();
    build
      .setSuccess(true)
      .setMessage("Successfully Fetched!")
      .setData(result)
      .build();
    return build;
  } catch (error) {
    const build = new ResponseDataBuilder();
    build
      .setSuccess(false)
      .setMessage(error["sqlMessage"])
      .setError(error["code"])
      .build();
    return build;
  }
}
async function getSubjectByID(id) {
  try {
    const q = `
  SELECT
    s.id,
    s.name,
    s.code,
    s.created_at,
    s.updated_at,
    u.id AS teacher_id,
    u.name AS teacher,
    g.name AS gender,
    u.profile
  FROM
    subjects AS s
    JOIN users AS u ON u.id = s.teacher_id
    JOIN gender AS g ON g.id = u.gender
  WHERE s.id = ${id}
    `;
    const result = await connection(q);
    return result;
  } catch (error) {
    return [];
  }
}

async function insertAndRetrieveData(name, code, unit, teacher_id) {
  try {
    const insertQuery = `INSERT INTO subjects(id, name, code, unit, teacher_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
    const insertParams = [name, code, unit, teacher_id, getCurrentTimestamp()];

    const test = await connection(insertQuery, insertParams);

    const selectQuery = `SELECT s.id, s.name, s.code, s.unit, s.created_at, s.updated_at, u.id AS teacher_id, u.name AS teacher, g.name AS gender, u.profile FROM subjects AS s JOIN users AS u ON u.id = s.teacher_id JOIN gender AS g ON g.id = u.gender WHERE s.id = ${test["insertId"]}`;

    const result = await connection(selectQuery);
    console.log(result); // Retrieved data
    return result;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

module.exports = {
  addSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject,
  getSubjectByID,
  insertAndRetrieveData,
};

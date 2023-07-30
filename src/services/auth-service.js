const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../security/encryption");

const connection = require("../database/connection");
const { ResponseDataBuilder } = require("../models/ResponseData");
async function signup(name, profile, type, email, password, gender) {
  try {
    const hash = await hashPassword(password);
    const query =
      `INSERT ` +
      `users ` +
      `VALUES ` +
      `('${uuidv4()}','${name}' , ${profile},${type},'${email}','${hash}','${gender}')`;
    const result = await connection(query);
    const builder = new ResponseDataBuilder();
    builder
      .setSuccess(true)
      .setMessage("Successfully Added")
      .setData(result["insertId"])
      .build();
    return builder;
  } catch (err) {
    console.log(err);
    const builder = new ResponseDataBuilder();
    builder
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
    return builder;
  }
}

async function signInWithEmailAndPassword(email) {
  try {
    const query =
      `SELECT * ` +
      `FROM ` +
      `users ` +
      `WHERE ` +
      `email = '${email}' ` +
      `LIMIT 1;`;
    const result = await connection(query);
    return new ResponseDataBuilder()
      .setSuccess(result.length != 0)
      .setData(result[0]);
  } catch (err) {
    console.log(err);
    return new ResponseDataBuilder()
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
  }
}

async function getAllTeachers() {
  try {
    const query =
      `SELECT u.id ,u.name,u.profile,t.name as type,g.name as gender,u.email,u.password ` +
      `FROM ` +
      `users AS u ` +
      `JOIN user_type AS t ON ` +
      `t.id = u.type ` +
      `JOIN gender AS g ON ` +
      `u.gender = g.id ` +
      `WHERE ` +
      `u.type = ${2} ` +
      `ORDER BY u.name`;
    const result = await connection(query);
    return new ResponseDataBuilder()
      .setSuccess(true)
      .setData(result)
      .setMessage("Successfully fetched!")
      .build();
  } catch (err) {
    console.log(err);
    return new ResponseDataBuilder()
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
  }
}

async function getAllUser() {
  try {
    const query =
      `SELECT u.id ,u.name,u.profile,t.name as type,g.name as gender,u.email,u.password ` +
      `FROM ` +
      `users AS u ` +
      `JOIN user_type AS t ON ` +
      `t.id = u.type ` +
      `JOIN gender AS g ON ` +
      `u.gender = g.id ` +
      `ORDER BY u.name`;
    const result = await connection(query);
    return new ResponseDataBuilder()
      .setSuccess(true)
      .setData(result)
      .setMessage("Successfully fetched!")
      .build();
  } catch (err) {
    console.log(err);
    return new ResponseDataBuilder()
      .setSuccess(false)
      .setMessage(err["sqlMessage"])
      .setError(err["code"])
      .build();
  }
}
async function addUser(name, profile, email, gender, type) {
  const hash = await hashPassword("12345");
  const id = uuidv4();

  try {
    const query =
      `INSERT ` +
      `users ` +
      `VALUES ` +
      `('${id}','${name}' , '${profile}',${type},'${email}','${hash}','${gender}')`;

    const result = await connection(query);
    console.log(result);
    return new ResponseDataBuilder()
      .setSuccess(true)
      .setMessage("Successfully Added")
      .setData(id)
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

async function getUserById(id) {
  try {
    const query =
      `SELECT u.id ,u.name,u.profile,u.type,u.gender,u.email,u.password ` +
      `FROM ` +
      `users AS u ` +
      `WHERE u.id = '${id}'`;
    const result = await connection(query);
    if (result.length !== 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
module.exports = {
  signup,
  signInWithEmailAndPassword,
  getAllTeachers,
  addUser,
  getAllUser,
  getUserById,
};

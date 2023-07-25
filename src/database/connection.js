const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) {
    console.log("Database error : ", err.stack);
    return;
  }
});

module.exports = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log("Querry Error : ", err);
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

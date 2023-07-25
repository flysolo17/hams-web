const connection = require("../database/connection");
const fs = require("fs");
async function addImage(data) {
  try {
    const q = "INSERT INTO images (image) VALUES (?)";
    await connection(q, data);
    return true;
  } catch (error) {
    return false;
  }
}

function readFile(file) {
  const bitmap = fs.readAs(file);
  return new Buffer.from(bitmap);
}
module.exports = { addImage, readFile };

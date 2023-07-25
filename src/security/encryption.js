const bcrypt = require("bcrypt");
async function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
async function checkPassword(password, encripted) {
  return bcrypt.compare(password, encripted);
}

module.exports = { hashPassword, checkPassword };

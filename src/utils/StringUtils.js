function convertJSDateToSqlDate(jsDate) {
  // Extract year, month, and day components from the JavaScript Date object
  const date = new Date(jsDate);

  // Get the year, month, and day as strings
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to the month because it is zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const sqlDate = `${year}-${month}-${day}`;
  return sqlDate;
}

function getCurrentTimestamp() {
  const jsDate = new Date();
  return jsDate.toISOString().slice(0, 19).replace("T", " ");
}

function nullConversion(data) {
  // Check if the variable is not null and convert to string
  if (data !== null || data !== undefined) {
    return String(data);
  }
  return null;
}

function nullOrInt(data) {
  // Check if the variable is not null and convert to string
  if (data !== null || data !== undefined) {
    return +data;
  }
  return null;
}

// Test the function
const jsDate = "2023-07-05T12:34:56"; // Example JavaScript Date string
const sqlDate = convertJSDateToSqlDate(jsDate);
console.log(sqlDate); // Output: "2023-07-05"

module.exports = {
  getCurrentTimestamp,
  convertJSDateToSqlDate,
  nullConversion,
  nullOrInt,
};

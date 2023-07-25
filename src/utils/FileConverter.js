const fs = require("fs");
function fileToBlob(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const blob = {
        data: data,
        type: "application/image", // Set the appropriate file type
        size: data.length,
      };

      resolve(blob);
    });
  });
}

module.exports = { fileToBlob };

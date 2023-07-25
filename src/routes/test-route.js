const express = require("express");

const { addImage, readFile } = require("../services/test-service");
const { fileToBlob } = require("../utils/FileConverter");
const upload = require("../utils/ImageUploader");
const router = express.Router();
const fs = require("fs");
router.post("/upload", upload.single("image"), async (req, res) => {
  res.send(req.file.filename);
  // fs.readFile(req.file.path, (err, data) => {
  //   if (err) {
  //     console.error("Error reading the file:", err);
  //   } else {
  //     const result = addImage(data);
  //     if (result) {
  //       res.send({ message: "success" });
  //     } else {
  //       res.send({ message: "error" });
  //     }
  //   }
});
module.exports = router;

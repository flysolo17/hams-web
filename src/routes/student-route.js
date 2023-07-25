const express = require("express");
const router = express.Router();
const {
  insertStudent,
  createContact,
  createAddress,

  signInWithLrnAndPassword,
  getStudentInfo,
  updateBirthday,
  updateProfile,
  updateStudentInfo,
} = require("../services/student-service");
const { hashPassword, checkPassword } = require("../security/encryption");
const { signUser, authenticateToken } = require("../security/authentication");
const upload = require("../utils/ImageUploader");
const { ResponseDataBuilder } = require("../models/ResponseData");
const connection = require("../database/connection");
const { convertJSDateToSqlDate } = require("../utils/StringUtils");
router.post("/insert", async (req, res) => {
  const { lrn, first_name, middle_name, last_name, gender, password } =
    req.body;
  console.log(req.body);
  const result = await insertStudent({
    lrn: lrn,
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    gender: +gender,
    password: password,
  });

  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(422).send(result);
  }
});

router.post("/create-contact", authenticateToken, async (req, res) => {
  const id = req.user.id;
  const result = await createContact({ ...req.body, student_id: id });
  if (result) {
    res.status(201).json(result[0]);
  } else {
    res.status(422).send({ message: "Failed creating contact!" });
  }
});

router.post("/create-address", authenticateToken, async (req, res) => {
  const id = req.user.id;
  const data = { ...req.body, student_id: id };
  const result = await createAddress(data);
  delete result[0].student_id;
  res.status(201).send(result[0]);
});

router.post("/login", async (req, res) => {
  const { lrn, password } = req.body;
  const result = await signInWithLrnAndPassword(lrn);
  if (result != null) {
    if (await checkPassword(password, result.password)) {
      res.status(200).json({
        success: true,
        error: null,
        message: "successfully Logged in!",
        data: signUser(result.id),
      });
    } else {
      res.status(200).json({
        success: false,
        error: "WRONG_PASSWORD",
        message: "wrong password",
        data: null,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "NOT FOUND",
      message: "student not found!",
      data: null,
    });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const id = req.user.id;
  if (id !== null || id !== undefined) {
    const result = await getStudentInfo(id);
    if (result !== null) {
      if (result.length !== 0 && result[0].birth_date != null) {
        result[0].birth_date = convertJSDateToSqlDate(result[0].birth_date);
      }
      const data = result[0];
      data["contacts"] = JSON.parse(data["contacts"]);
      data["addresses"] = JSON.parse(data["addresses"]);
      res.status(200).json({
        success: true,
        message: "Successfully Fetched!",
        data: data,
      });
    } else {
      res.status(404).json({
        success: true,
        error: "Not Found",
        message: "Student not found",
        data: null,
      });
    }
  }
});
router.patch("/update-birthday", authenticateToken, async (req, res) => {
  const { birth_date } = req.body;
  const id = req.user.id;
  if (id !== null || id !== undefined) {
    const result = await updateBirthday(birth_date, id);
    res.status(200).send(result);
  }
});

router.patch(
  "/update-profile",
  authenticateToken,
  upload.single("profile"),
  async (req, res) => {
    const id = req.user.id;
    if (!req.file) {
      res.status(400).json({ message: "Error" });
    } else {
      profile = req.file.filename;
      const result = await updateProfile(profile, id);
      if (result) {
        res
          .status(200)
          .json(
            new ResponseDataBuilder()
              .setSuccess(result)
              .setMessage("Successfully Updated")
              .setData(profile)
              .build()
          );
      } else {
        res
          .status(500)
          .json(
            new ResponseDataBuilder()
              .setSuccess(result)
              .setError("Unknown Error")
              .setMessage("FAiled to update Profile")
              .build()
          );
      }
    }
  }
);

router.patch("/update-info", authenticateToken, async (req, res) => {
  const id = req.user.id;
  const result = await updateStudentInfo({ ...req.body, id: id });
  if (result) {
    res
      .status(200)
      .json(
        new ResponseDataBuilder()
          .setSuccess(true)
          .setMessage("Successfully Updated!")
          .build()
      );
  } else {
    res
      .status(500)
      .json(
        new ResponseDataBuilder()
          .setSuccess(true)
          .setMessage("Failed to update!")
          .build()
      );
  }
});
module.exports = router;

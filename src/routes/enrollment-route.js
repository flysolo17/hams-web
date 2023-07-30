const express = require("express");
const {
  createEnrollmentRequest,
  cancelEnrollment,
  getEnrollments,
  getAllEnrollment,
  updateEnrollmentStatus,
  addSubjectToEnroll,
} = require("../services/enrollment-service");
const { authenticateToken } = require("../security/authentication");

const { convertJSDateToSqlDate } = require("../utils/StringUtils");
const { ResponseDataBuilder } = require("../models/ResponseData");
const { getStudentInfo } = require("../services/student-service");
const router = express.Router();

router.get("/my-enrollments", authenticateToken, async (req, res) => {
  const id = req.user.id;
  const result = await getEnrollments(id);
  result.map((data) => {
    data["enrollment_date"] = convertJSDateToSqlDate(data["enrollment_date"]);
    data["updated_at"] = convertJSDateToSqlDate(data["updated_at"]);
  });
  res.status(200).json(result);
});
router.post(
  "/create-enrollment-request",
  authenticateToken,
  async (req, res) => {
    const {
      grade_level,
      school_year,
      track,
      strand,
      semester,
      enrollment_types,
    } = req.body;

    const processedTrack = track || null;
    const processedStrand = strand || null;
    const processedSemester = semester || null;
    console.log(req.body);
    const result = await createEnrollmentRequest(
      req.user.id,
      grade_level,
      school_year,
      processedTrack,
      processedStrand,
      processedSemester,
      enrollment_types
    );

    if (result) {
      res
        .status(201)
        .json(
          new ResponseDataBuilder()
            .setSuccess(true)
            .setMessage("succefully created!")
        );
    } else {
      res
        .status(500)
        .json(
          new ResponseDataBuilder()
            .setSuccess(true)
            .setMessage("Failed to create Request!")
        );
    }
  }
);
router.patch("/cancel-enrollment", authenticateToken, async (req, res) => {
  const enrollment_id = req.query.id;
  const result = await cancelEnrollment(enrollment_id);
  if (result) {
    res
      .status(200)
      .send(
        new ResponseDataBuilder()
          .setSuccess(true)
          .setMessage("Successfully Updated!")
          .build()
      );
  } else {
    req
      .status(500)
      .send(
        new ResponseDataBuilder()
          .setSuccess(false)
          .setMessage("Failed to cancel!")
          .build()
      );
  }
});
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await getAllEnrollment();
    result.map((data) => {
      data.enrolled_subjects = data.enrolled_subjects
        ? JSON.parse(data.enrolled_subjects)
        : null;
    });
    res.status(200).send(result);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/update-enrollment-status", async (req, res) => {
  const enrollment_id = req.query.id;
  const status = req.query.status;
  console.log(enrollment_id, status);
  const result = await updateEnrollmentStatus(enrollment_id, status);
  if (result) {
    res
      .status(200)
      .send(
        new ResponseDataBuilder()
          .setSuccess(true)
          .setMessage("Successfully Updated!")
          .build()
      );
  } else {
    req
      .status(500)
      .send(
        new ResponseDataBuilder()
          .setSuccess(false)
          .setMessage("Failed to cancel!")
          .build()
      );
  }
});
router.get("/learner-info", authenticateToken, async (req, res) => {
  const id = req.query.student_id;
  if (id !== null || id !== undefined) {
    const result = await getStudentInfo(id);
    if (result !== null) {
      if (result.length !== 0 && result[0].birth_date != null) {
        result[0].birth_date = convertJSDateToSqlDate(result[0].birth_date);
      }
      const data = result[0];
      data["contacts"] = data.contacts ? JSON.parse(data["contacts"]) : null;
      data["addresses"] = data.addresses ? JSON.parse(data["addresses"]) : null;
      res.status(200).json(data);
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

router.post("/enroll-subject", authenticateToken, async (req, res) => {
  const { enrollment_id, subject_id } = req.body;
  const result = await addSubjectToEnroll(enrollment_id, subject_id);
  if (result) {
    res
      .status(201)
      .json(
        new ResponseDataBuilder()
          .setSuccess(true)
          .setData(subject_id)
          .setMessage("Successfully Added!")
          .build()
      );
  } else {
    res
      .status(500)
      .json(
        new ResponseDataBuilder()
          .setSuccess(false)
          .setMessage("Failed!")
          .build()
      );
  }
});

module.exports = router;

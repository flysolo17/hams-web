const express = require("express");
const {
  createEnrollmentRequest,
  cancelEnrollment,
  getEnrollments,
  getAllEnrollment,
  updateEnrollmentStatus,
} = require("../services/enrollment-service");
const { authenticateToken } = require("../security/authentication");
const { route } = require("./auth-routes");
const {
  convertJSDateToSqlDate,
  nullConversion,
} = require("../utils/StringUtils");
const { ResponseDataBuilder } = require("../models/ResponseData");
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
  const result = await getAllEnrollment();
  res.status(200).send(result);
});

router.patch(
  "/update-enrollment-status",

  async (req, res) => {
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
  }
);
module.exports = router;

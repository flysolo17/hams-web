const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../security/authentication");

const {
  addSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject,
  getSubjectByID,
  insertAndRetrieveData,
} = require("../services/subject-service");

router.post("/insert", authenticateToken, async (req, res) => {
  const { name, code, unit, teacher_id } = req.body;
  const result = await addSubject(name, code, unit, teacher_id);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(422).send(result);
  }
});
router.get("/", authenticateToken, async (req, res) => {
  const result = await getAllSubjects();
  res.status(200).send(result);
});

router.delete("/delete", authenticateToken, async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const result = await deleteSubject(+id);
  if (result) {
    res.status(200).send({
      message: "subject deleted!",
      result: result,
    });
  } else {
    res.status(500).send({
      message: "Failed deleting subject",
      result: result,
    });
  }
});

router.patch("/update", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const { name, code, unit, teacher_id } = req.body;
  const result = await updateSubject(+id, name, code, unit, teacher_id);
  if (result.success) {
    res.status(200).send(result);
  } else {
    res.status(500).send(result);
  }
});

router.post("/insertAndRetrieve", authenticateToken, async (req, res) => {
  const { name, code, unit, teacher_id } = req.body;
  const result = await insertAndRetrieveData(name, code, unit, teacher_id);

  res.status(201).send(result);
});
module.exports = router;

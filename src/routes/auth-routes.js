const express = require("express");
const {
  signup,
  signInWithEmailAndPassword,
  getAllTeachers,

  addUser,
  getAllUser,
  getUserById,
} = require("../services/auth-service");
const { hashPassword, checkPassword } = require("../security/encryption");
const { signUser, authenticateToken } = require("../security/authentication");

const router = express.Router();
const path = require("path");
const upload = require("../utils/ImageUploader");

router.post("/signup", upload.single("profile"), async (req, res) => {
  const { name, type, email, password, gender } = req.body;
  var profile = null;
  if (!req.file) {
    profile = null;
  } else {
    profile = req.file.filename;
  }
  const result = await signup(name, profile, +type, email, password, +gender);
  if (result.success) {
    res.status(201).send(result);
  } else {
    res.status(500).send(result);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await signInWithEmailAndPassword(email);
  if (result.success) {
    if (await checkPassword(password, result.data.password)) {
      res
        .status(200)
        .json(
          result
            .setData(signUser(result.data.id))
            .setMessage("Successfully Logged In")
            .build()
        );
    } else {
      res
        .status(409)
        .json(
          result
            .setSuccess(false)
            .setMessage("Wrong Password")
            .setError("WRONG_PASSWORD")
            .setData(null)
            .build()
        );
    }
  } else {
    res
      .status(404)
      .json(result.setMessage("User not Found!").setData(null).build());
  }
});
router.post(
  "/add-user",
  authenticateToken,
  upload.single("profile"),
  async (req, res) => {
    const { name, email, gender, type } = req.body;
    console.log(req.body);
    if (!req.file) {
      profile = null;
    } else {
      profile = req.file.filename;
    }
    const result = await addUser(
      name,
      req.file.filename.toString(),
      email,
      +gender,
      +type
    );
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  }
);

router.get("/teachers", authenticateToken, async (req, res) => {
  const result = await getAllTeachers();
  res.status(200).send(result);
});

router.get("/users", authenticateToken, async (req, res) => {
  const result = await getAllUser();
  res.status(200).send(result);
});

router.get("/get-user", authenticateToken, async (req, res) => {
  const result = await getUserById(req.user.id);
  if (result != null) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "User not found!" });
  }
});
module.exports = router;

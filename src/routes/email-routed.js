const express = require("express");
const { isValidEmail } = require("../utils/StringUtils");
const router = express.Router();
const { ResponseDataBuilder } = require("../models/ResponseData");
const nodemailer = require("nodemailer");
const { authenticateToken } = require("../security/authentication");
router.post("/send-email", authenticateToken, async (req, res) => {
  const { to, subject, text } = req.body;
  if (isValidEmail(to)) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jmballangca001@gmail.com",
        pass: "hgzqogugbrkjyjol",
      },
    });

    const mailOptions = {
      from: "jmballangca001@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
        res
          .status(500)
          .send(
            new ResponseDataBuilder()
              .setSuccess(false)
              .setMessage("error sending email")
              .build()
          );
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json(
            new ResponseDataBuilder()
              .setSuccess(true)
              .setMessage("Email sent to :", to)
              .build()
          );
      }
    });
  }
});
module.exports = router;

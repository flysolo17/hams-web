const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

/**Middlewares */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
const port = 3000;

/**Routes */

const authRoute = require("./routes/auth-routes");
app.use("/auth", authRoute);

const subjectRoute = require("./routes/subject-routes");
app.use("/subjects", subjectRoute);
const studentRoute = require("./routes/student-route");
app.use("/student", studentRoute);
const testRoute = require("./routes/test-route");
app.use("/test", testRoute);

const enrollment = require("./routes/enrollment-route");
app.use("/enrollment", enrollment);

const emailRoute = require("./routes/email-routed");
const { getCurrentTimestamp } = require("./utils/StringUtils");
app.use("/email", emailRoute);

app.listen(port, () => {
  console.log("listening to port: ", port);
});

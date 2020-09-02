const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
var multer = require("multer");
var upload = multer();

const auth = require("./app/routes/auth.routes");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

app.use(cors(corsOptions));
app.use(upload.array());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(morgan("dev"));

// database
const db = require("./app/models");
const Plan = db.plan;

db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// routes

app.use("/api/auth", auth);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Plan.create({
    id: 1,
    title: "Free",
    slug: "free",
    limit: 1,
    rate: 0,
  });

  Plan.create({
    id: 2,
    title: "Expertise",
    slug: "expertise",
    limit: 3,
    rate: 4,
  });

  Plan.create({
    id: 3,
    title: "Agency",
    slug: "agency",
    limit: null,
    rate: 10,
  });
}

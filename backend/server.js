const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors());

// parse requests of application/json
app.use(express.json());

// parse requests of application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Conciliador application." });
});

require("./src/routes/tarjetasr.routes")(app);
require("./src/routes/tarjetascompleto.routes")(app);
require("./src/routes/auxiliar.routes")(app);
require("./src/routes/extracto.routes")(app);

// set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. url: http://localhost:${PORT}`
  );
});

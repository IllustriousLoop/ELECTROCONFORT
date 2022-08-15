const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require("dotenv").config();

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

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
require("./src/routes/files.routes")(app);

// set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. url: http://localhost:${PORT}`
  );
});

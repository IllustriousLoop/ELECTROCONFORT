const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.TarjetasR = require("./tarjetasr.model.js")(mongoose);
db.TarjetasCompleto = require("./tarjetascompleto.model.js")(mongoose);
db.Auxiliar = require("./auxiliar.model.js")(mongoose);
db.Extracto = require("./extracto.model.js")(mongoose);
db.files = require("./files.model.js")(mongoose);

module.exports = db;

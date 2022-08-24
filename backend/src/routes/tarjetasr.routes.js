const TarjetasR = require("../controllers/tarjetasr.controller.js");
const { valid } = require("../middleware/MES");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", valid, TarjetasR.create);

  router.get("/", valid, TarjetasR.findAll);

  router.get("/:id", TarjetasR.findOne);

  router.put("/:id", TarjetasR.update);

  router.delete("/:id", TarjetasR.delete);

  router.delete("/", TarjetasR.deleteAll);

  app.use("/api/tarjetasr", router);
};

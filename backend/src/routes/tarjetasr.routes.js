const TarjetasR = require("../controllers/tarjetasr.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", TarjetasR.create);

  router.get("/", TarjetasR.findAll);

  router.get("/:id", TarjetasR.findOne);

  router.put("/:id", TarjetasR.update);

  router.delete("/:id", TarjetasR.delete);

  router.delete("/", TarjetasR.deleteAll);

  app.use("/api/tarjetasr", router);
};

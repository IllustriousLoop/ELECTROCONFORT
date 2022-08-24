const auxiliar = require("../controllers/auxiliar.controller.js");
let router = require("express").Router();
const { valid } = require("../middleware/MES");

module.exports = (app) => {
  router.post("/", valid, auxiliar.create);

  router.get("/", valid, auxiliar.findAll);

  router.get("/all/:tipo", valid, auxiliar.findAllType);

  router.get(
    "/specific/:terminal/:franquicia/:dia/:tipo",
    valid,
    auxiliar.findSpecific
  );

  router.post("/ids", auxiliar.findAllIds);

  router.get("/:id", auxiliar.findOne);

  router.put("/:id", auxiliar.update);

  router.delete("/:id", auxiliar.delete);

  router.delete("/", auxiliar.deleteAll);

  app.use("/api/auxiliar", router);
};

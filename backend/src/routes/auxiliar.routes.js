const auxiliar = require("../controllers/auxiliar.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", auxiliar.create);

  router.get("/", auxiliar.findAll);

  router.get("/all/:tipo", auxiliar.findAllType);

  router.get(
    "/specific/:terminal/:franquicia/:dia/:tipo",
    auxiliar.findSpecific
  );

  router.post("/ids", auxiliar.findAllIds);

  router.get("/:id", auxiliar.findOne);

  router.put("/:id", auxiliar.update);

  router.delete("/:id", auxiliar.delete);

  router.delete("/", auxiliar.deleteAll);

  app.use("/api/auxiliar", router);
};

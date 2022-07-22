const tarjetascompleto = require("../controllers/tarjetascompleto.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", tarjetascompleto.create);

  router.get("/", tarjetascompleto.findAll);

  router.get("/all/:tipo", tarjetascompleto.findAllType);

  router.get(
    "/specific/:terminal/:franquicia/:dia/:tipo",
    tarjetascompleto.findSpecific
  );

  router.post("/ids", tarjetascompleto.findAllIds);

  router.get("/:id", tarjetascompleto.findOne);

  router.put("/:id", tarjetascompleto.update);

  router.delete("/:id", tarjetascompleto.delete);

  router.delete("/", tarjetascompleto.deleteAll);

  app.use("/api/tarjetascompleto", router);
};

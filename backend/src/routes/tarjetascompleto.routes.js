const tarjetascompleto = require("../controllers/tarjetascompleto.controller.js");
const { valid } = require("../middleware/MES");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", valid, tarjetascompleto.create);

  router.get("/", valid, tarjetascompleto.findAll);

  router.get("/all/:tipo", valid, tarjetascompleto.findAllType);

  router.get(
    "/specific/:terminal/:franquicia/:dia/:tipo",
    valid,
    tarjetascompleto.findSpecific
  );

  router.post("/ids", tarjetascompleto.findAllIds);

  router.get("/:id", tarjetascompleto.findOne);

  router.put("/:id", tarjetascompleto.update);

  router.delete("/:id", tarjetascompleto.delete);

  router.delete("/", tarjetascompleto.deleteAll);

  app.use("/api/tarjetascompleto", router);
};

const extracto = require("../controllers/extracto.controller.js");
let router = require("express").Router();
const { valid } = require("../middleware/MES");

module.exports = (app) => {
  router.post("/", valid, extracto.create);

  router.get("/", valid, extracto.findAll);

  router.get("/:id", extracto.findOne);

  router.put("/:id", extracto.update);

  router.delete("/:id", extracto.delete);

  router.delete("/", extracto.deleteAll);

  app.use("/api/extracto", router);
};

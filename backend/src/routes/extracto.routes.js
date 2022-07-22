const extracto = require("../controllers/extracto.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  router.post("/", extracto.create);

  router.get("/", extracto.findAll);

  router.get("/:id", extracto.findOne);

  router.put("/:id", extracto.update);

  router.delete("/:id", extracto.delete);

  router.delete("/", extracto.deleteAll);

  app.use("/api/extracto", router);
};

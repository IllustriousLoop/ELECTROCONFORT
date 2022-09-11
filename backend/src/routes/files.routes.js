let router = require("express").Router();
const filesController = require("../controllers/files.controller.js");
const { valid } = require("../middleware/MES");

module.exports = (app) => {
  router.post("/files", valid, filesController.create);
  router.post("/valid", valid, filesController.valid);
  router.delete("/", filesController.deleteAll);

  app.use("/api/upload", router);
};

let router = require("express").Router();
const _ = require("lodash");

module.exports = (app) => {
  router.post("/files", async (req, res) => {
    if (!req.query.MES)
      return res.status(400).send({ message: "MES can not be empty!" });

    try {
      if (!req.files.file) {
        res.status(400).send({
          message: "Files can not be empty!",
        });
      } else {
        let data = [];
        const files = req.files;

        //loop all files
        try {
          _.forEach(_.keysIn(files.file), (key) => {
            let file = files.file[key];
            //move photo to uploads directory
            file.mv(`./uploads/${req.query.MES}/` + file.name);

            data.push({
              name: file.name,
              mimetype: file.mimetype,
              size: file.size,
            });
          });
        } catch (error) {
          res.send({ message: "Error uploading file" });
        }

        //return response
        res.send({
          message: "Files are uploaded",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.use("/api/upload", router);
};

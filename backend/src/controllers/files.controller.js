const db = require("../models");
const validationAsync = require("../utils/validators/csv");
const uploadFiles = require("../utils/uploadFiles");
const insertInDB = require("../database");
const fs = require("fs").promises;
const fs2 = require("fs");

const Files = db.files;

exports.create = async (req, res) => {
  if (!req.files || !req.files.length === 0) {
    res.status(400).send({
      message: "Files can not be empty!",
    });
  }
  const query = {
    month: { $eq: req.query.MES },
    year: { $eq: 2022 },
  };

  const dataAllFiles = await Files.find(query);

  if (dataAllFiles.length === 0) {
    const dataUploaded = await uploadFiles(req.files.file, req.query.MES);
    if (dataUploaded.length === req.files.file.length) {
      res.send({
        message: `${dataUploaded.length} files are uploaded`,
      });
    }
  } else {
    res.status(400).send({
      message: "Este mes ya esta en la base de datos",
      data: [],
    });
  }
};

exports.valid = async (req, res) => {
  try {
    const query = {
      month: { $eq: req.query.MES },
      year: { $eq: 2022 },
    };

    const dataAllFiles = await Files.find(query);

    if (dataAllFiles.length > 0) {
      const { fileValid, fileNoValid } = await validationAsync(dataAllFiles);

      if (fileNoValid.length > 0) {
        let deletedCount = 0;
        await Promise.all(
          dataAllFiles.map(async (f) => {
            if (fs2.existsSync(f.path)) await fs.unlink(f.path);
            await Files.findByIdAndRemove(f._id);
            deletedCount++;
          })
        );
        res.status(400).send({
          message: "Los Archivos no son validos, por favor vuelva a subirilos",
          data: fileNoValid,
        });
      } else if (
        fileValid.length === dataAllFiles.length &&
        dataAllFiles[0].inDataBase
      ) {
        res.status(400).send({
          message: "Este mes ya esta en la base de datos",
          data: [],
        });
      } else {
        console.log("Insertando en base de datos");
        const { data, noDB } = await insertInDB(dataAllFiles);

        const ids = dataAllFiles.map((item) => {
          return item.id;
        });

        const updatedFiles = await Files.updateMany(
          { _id: { $in: ids } },
          { inDataBase: true }
        );

        if (noDB.length > 0) {
          res.status(400).send({
            message:
              "Ocurrio un error, por favor verifica las archivos subidos",
            data: noDB,
          });
        } else if (data.length === dataAllFiles.length) {
          res.status(200).send({
            message: `Listo ya se subio todo y se actualizaron ${updatedFiles.modifiedCount}`,
            data,
          });
        }
      }
    } else {
      res.status(400).send({
        message: `No hay archivos para el mes ${req.query.MES}`,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: `No se pudo validar`,
      data: error,
    });
  }
};

exports.deleteAll = async (req, res) => {
  const queryAll = {
    month: { $eq: req.query.MES },
    year: { $eq: 2022 },
  };

  try {
    const dataAllFiles = await Files.find(queryAll);
    let deletedCount = 0;

    await Promise.all(
      dataAllFiles.map(async (f) => {
        if (fs2.existsSync(f.path)) await fs.unlink(f.path);
        await Files.findByIdAndRemove(f._id);
        deletedCount++;
      })
    );

    res.send({
      message: `${deletedCount} records were deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while removing all records.",
      data: error,
    });
  }
};

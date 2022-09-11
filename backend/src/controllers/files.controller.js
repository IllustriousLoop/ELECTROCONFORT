const db = require("../models");
const { dirname } = require("path");
const _ = require("lodash");
const { validCsv, ReadCsv2 } = require("../utils/validators/csv");

const rootPath = dirname(require.main.filename);
const Files = db.files;
const Auxiliar = db.Auxiliar;
const Extracto = db.Extracto;
const TarjetasCompleto = db.TarjetasCompleto;
const TarjetasR = db.TarjetasR;

exports.create = async (req, res) => {
  if (!req.files || !req.files.length === 0) {
    res.status(400).send({
      message: "Files can not be empty!",
    });
  }
  const files = req.files;
  let dataUploaded = [];

  _.forEach(_.keysIn(files.file), (key) => {
    const file = files.file[key];
    const filePath = `${rootPath}/uploads/${req.query.MES}/${file.name}`;
    const record = new Files({
      year: 2022,
      month: req.query.MES,
      name: file.name,
      inDataBase: false,
      path: filePath,
    });

    dataUploaded.push({
      name: file.name,
      path: file.path,
    });

    file.mv(filePath, (err) => {
      if (err)
        return res.status(500).send({ message: `Error al mover ${file.name}` });
    });

    record.save(record).catch((e) => {
      console.log(e.message);
    });
  });

  if (dataUploaded.length === files.file.length) {
    res.send({
      message: `${dataUploaded.length} files are uploaded`,
    });
  }
};

const validationAsync = (data) => {
  const ready = [];
  const noValid = [];
  return new Promise(function (resolve, reject) {
    _.forEach(data, async (f, k) => {
      if (f.inDataBase) {
        ready.push(f);
      } else {
        const verify = await validCsv(f.path, f.name);
        if (!verify.valid) {
          noValid.push(f.name);
        } else {
          ready.push(f);
        }
      }
      if (k === data.length - 1) resolve({ ready, noValid });
    });
  });
};
const uploadDB = async (data) => {
  const file = await ReadCsv2(data.path);
  try {
    let res;
    switch (data.name) {
      case "auxi.csv":
        res = await Auxiliar.insertMany(file);
      case "cn01.csv":
        res = await TarjetasR.insertMany(file);
        break;
      case "dheh.csv":
        res = await TarjetasCompleto.insertMany(file);
        break;
      case "extr.csv":
        res = await Extracto.insertMany(file);
        break;
      default:
        return { state: false, info: ["desconocido"] };
    }
    return { state: true, info: res };
  } catch (error) {
    console.log("Error Record", error);
    return { state: false, info: error };
  }
};
const dbU = async (data) => {
  const ready = [];
  const noDB = [];

  await Promise.all(
    data.map(async (f) => {
      const { state, info } = await uploadDB(f);
      if (!state) {
        noDB.push(info);
      } else {
        ready.push(info);
      }
    })
  );

  return { data: ready, noDB };
};
exports.valid = async (req, res) => {
  const query = {
    month: { $eq: req.query.MES },
    year: { $eq: 2022 },
  };

  const r = await Files.find(query);
  const { ready, noValid } = await validationAsync(r);

  if (noValid.length > 0) {
    res.status(400).send({
      message: "Archivos no son validos, por favor vueva a subirilos",
      data: noValid,
    });
  } else if (ready.length === r.length && r[0].inDataBase) {
    res.status(200).send({
      message: "Este mes ya esta en la base de datos",
      data: [],
    });
  } else {
    console.log("Subiendo a la base de datos");
    const { data, noDB } = await dbU(r);

    const ids = r.map((item) => {
      return item.id;
    });

    const updatedFiles = await Files.updateMany(
      { _id: { $in: ids } },
      { inDataBase: true }
    );

    if (noDB.length > 0) {
      res.status(400).send({
        message: "Ocurrio un error, por favor verifica las archivos subidos",
        data: noDB,
      });
    } else if (data.length === r.length) {
      res.status(200).send({
        message: `Listo ya se subio todo y se actualizaron ${updatedFiles.modifiedCount}`,
        data,
      });
    }
  }
};

exports.deleteAll = (req, res) => {
  Files.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};

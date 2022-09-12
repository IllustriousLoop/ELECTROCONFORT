const readCsv = require("../utils/validators/readCsv");
const db = require("../models");

const Auxiliar = db.Auxiliar;
const Extracto = db.Extracto;
const TarjetasCompleto = db.TarjetasCompleto;
const TarjetasR = db.TarjetasR;

const handlerInsertDB = async (data) => {
  const file = await readCsv(data.path, true);

  try {
    let res = [];
    switch (data.name) {
      case "auxi.csv":
        res = await Auxiliar.insertMany(file);
        break;
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

const insertInDB = async (data) => {
  const ready = [];
  const noDB = [];

  await Promise.all(
    data.map(async (f) => {
      const { state, info } = await handlerInsertDB(f);
      if (!state) {
        noDB.push(info);
      } else {
        ready.push(info);
      }
    })
  );

  return { data: ready, noDB };
};

module.exports = insertInDB;

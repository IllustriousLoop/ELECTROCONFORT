const { utilsFormatPath } = require("../myPaths");
const readCsv = require("./readCsv");
const _ = require("lodash");

const validOneCsv = async (path, name) => {
  try {
    const pathOriginHeader = `${utilsFormatPath}${name}`;
    const originHeaders = await readCsv(pathOriginHeader, false);
    const headers = await readCsv(path, false);

    const missing = [];


    originHeaders.map((e, key) => {
      if (e !== headers[key]) missing.push(e);
    });

    if (missing.length === 0) return { valid: true };
    else
      return {
        valid: false,
        error: `${name} is not a valid`,
        data: missing,
      };
  } catch (error) {
    return {
      valid: false,
      error: `No se puedo encontrar o procesar '${name}'`,
      data: error,
    };
  }
};

const validationAsync = (data) => {
  const fileValid = [];
  const fileNoValid = [];

  return new Promise(function (resolve, reject) {
    try {
      _.forEach(data, async (f, k) => {
        if (f.inDataBase) {
          fileValid.push(f);
        } else {
          const verify = await validOneCsv(f.path, f.name);

          if (!verify.valid) {
            fileNoValid.push({ [f.name]: [verify.error, verify.data] });
          } else {
            fileValid.push(f);
          }
        }
        if (k === data.length - 1) resolve({ fileValid, fileNoValid });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = validationAsync;

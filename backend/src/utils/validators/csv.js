const fs = require("fs");
const _ = require("lodash");
const csv = require("csv-parser");
const { dirname } = require("path");

const mainPath = `${dirname(require.main.filename)}/src/utils/format/`;

const ReadCsv2 = (path) => {
  const results = [];

  return new Promise(function (resolve, reject) {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => {
        const fix = _.keysIn(data)[0].trim();
        const m = data[_.keysIn(data)[0]];
        delete data[_.keysIn(data)[0]];
        results.push({ [fix]: m, ...data });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const ReadCsv = (path) => {
  const results = [];
  return new Promise(function (resolve, reject) {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", () => {})
      .on("headers", (data) => data.forEach((element) => results.push(element)))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const validCsv = async (path, name) => {
  const originHeaders = await ReadCsv(mainPath + name);
  const headers = await ReadCsv(path);

  const missing = [];

  originHeaders.map((e, key) => {
    if (e !== headers[key]) {
      missing.push(e);
    }
  });

  if (missing.length === 0) {
    return { valid: true };
  } else {
    return {
      valid: false,
      error: `${name} is not a valid`,
      data: missing,
    };
  }
};

module.exports = { validCsv, ReadCsv2 };

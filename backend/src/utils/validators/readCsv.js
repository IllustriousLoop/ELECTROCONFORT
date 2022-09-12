const _ = require("lodash");
const fs = require("fs");
const csv = require("csv-parser");

const read = (path, request) => {
  const dataFileRead = [];
  const headersFileRead = [];

  return new Promise((resolve, reject) => {
    const raw = fs.createReadStream(path);
    raw
      .pipe(csv())
      .on("data", (rowData) => {
        const fix = _.keysIn(rowData)[0].trim();
        const m = rowData[_.keysIn(rowData)[0]];
        delete rowData[_.keysIn(rowData)[0]];
        dataFileRead.push({ [fix]: m, ...rowData });
      })
      .on("headers", (header) =>
        header.forEach((string) => headersFileRead.push(string))
      );
    raw
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        if (request) resolve(dataFileRead);
        else resolve(headersFileRead);
      });
  });
};

module.exports = read;

const db = require("../models");
const _ = require("lodash");
const { rootPath } = require("../utils/myPaths");

const Files = db.files;

const uploadFiles = async (arrFiles, month) => {
  let dataUploaded = [];

  await Promise.all(
    _.forEach(_.keysIn(arrFiles), async (key) => {
      const file = arrFiles[key];
      const filePath = `${rootPath}/uploads/${month}/${file.name}`;

      const record = new Files({
        year: 2022,
        month,
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
          return res
            .status(500)
            .send({ message: `Error al mover ${file.name}` });
      });

      await record.save(record);
    })
  );
  return dataUploaded;
};
module.exports = uploadFiles;

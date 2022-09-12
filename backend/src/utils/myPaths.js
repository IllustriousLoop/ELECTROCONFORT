const { dirname } = require("path");

const rootPath = dirname(require.main.filename);
const mainPath = `${rootPath}/src`;

const utilsFormatPath = `${mainPath}/utils/format/`;

module.exports = { rootPath, mainPath, utilsFormatPath };

const { join } = require("path");
require("ts-node").register({
  dir: __dirname,
  project: join(__dirname, "tsconfig.json"),
});
const fuse = require("./fuse");
module.exports = fuse;

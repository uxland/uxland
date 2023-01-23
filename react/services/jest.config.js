const config = require("../../packages/project-tools/test/jest.config");
const pack = require("./package");

module.exports = {
  ...config,
  setupFilesAfterEnv: ["../../packages/project-tools/test/setup.ts"],
  name: pack.name,
  displayName: pack.name,
};

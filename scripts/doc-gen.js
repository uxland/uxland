const jsdoc2md = require('../node_modules/jsdoc-to-markdown/index');
// jsdoc2md.render({ files: 'packages/functional-utilities/src/**/*.js' }).then(console.log);

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

const generatePackageDoc = async package => {
  const doc = await jsdoc2md.render({ files: `packages/${package}/src/**/*.js` });
  fs.writeFile(`packages/${package}/docs/index.md`, doc, 'utf-8', async err => console.log(err));

  //   const files = await (await exec(`cd packages/${package}/src && ls \`find . -name '*.js' -print\``)).stdout;
  //   files.split('\n').forEach(async file => {
  //     const doc = await jsdoc2md.render({ source: `packages/${package}/src/${file}` });
  //     console.log(doc);
  //     // fs.writeFile(`packages/${package}/docs/${file}.md`, doc);
  //   });
};

const generateDoc = async () => {
  const packages = await (await exec(`ls packages`)).stdout;
  packages
    .split('\n')
    .forEach(async package => package == 'functional-utilities' && (await generatePackageDoc(package)));
};

generateDoc();

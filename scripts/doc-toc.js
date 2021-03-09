// const jsdoc2md = require('../node_modules/jsdoc-to-markdown/index');
// // jsdoc2md.render({ files: 'packages/functional-utilities/src/**/*.js' }).then(console.log);

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
// const fs = require('fs');

// const generatePackageDoc = async package => {
//   const doc = await jsdoc2md.render({ files: `packages/${package}/src/**/*.js` });
//   fs.writeFile(`packages/${package}/docs/index.md`, doc, 'utf-8', async err => Promise.resolve());
// };

// const generateDoc = async () => {
//   const packages = await (await exec(`ls packages`)).stdout;
//   packages
//     .split('\n')
//     .forEach(async package => package == 'functional-utilities' && (await generatePackageDoc(package)));
// };

// generateDoc();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

const tocHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta charset="utf-8">
    <title>Home - Documentation</title>
    
    
    <script src="scripts/prettify/prettify.js"></script>
    <script src="scripts/prettify/lang-css.js"></script>
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/prettify.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc.css">
    <script src="scripts/nav.js" defer></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`;

const getPackageInfo = package => require(`../packages/${package}/package.json`);
const generateTOC = async () => {
  console.info('Generating documentation TOC...');
  console.info('Retrieving packages');
  const packages = await (await exec('ls docs/@uxland')).stdout;
  console.info('Generating template');
  const template = `${tocHeader}<body>
    ${packages
      .split('\n')
      .filter(p => p)
      .reduce((links, package) => {
        const packageInfo = getPackageInfo(package);
        links = links.concat(
          `<h3>
            <a href="${packageInfo.name}/${packageInfo.version}/index.html">${packageInfo.name}</a>
          </h3>`
        );
        return links;
      }, '')}
    </body>
  </html>`;
  console.info('Generating TOC file');
  await (await exec('npx ncp resources/docs docs')).stdout;
  fs.writeFile(`${__dirname}/../docs/index.html`, template, 'utf-8', async err => Promise.resolve());
  console.info('TOC generated!');
};

generateTOC();

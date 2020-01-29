const util = require('util');
const exec = util.promisify(require('child_process').exec);
const branchName = require('current-git-branch');

const prereleaseBranches = ['alpha', 'beta'];
const isPrereleaseBranch = branch => prereleaseBranches.indexOf(branch) > -1;

const publish = async () => {
  if (isPrereleaseBranch(branchName())) await exec(`lerna version --conventional-prerelease`);
  else await exec(`lerna version --conventional-commits`);
};

publish();

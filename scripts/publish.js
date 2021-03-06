const spawn = require('child_process').spawn;
const branchName = require('current-git-branch');

const prereleaseBranches = ['alpha', 'beta'];
const isPrereleaseBranch = branch => prereleaseBranches.indexOf(branch) > -1;

const publish = async () => {
  let cmd;
  if (isPrereleaseBranch(branchName()))
    cmd = spawn('lerna', ['publish', '--conventional-prerelease' /*, `--pre-dist-tag ${branchName()}`*/]);
  else cmd = spawn('lerna', ['publish', '--conventional-commits']);

  try {
    cmd.stdout && cmd.stdout.on('data', data => console.log(`stdout: ${data.toString()}`));
    cmd.stderr && cmd.stderr.on('data', data => console.log(`stderr: ${data.toString()}`));
    cmd.exit && cmd.exit.on('data', data => console.log(`child process exited with code: ${data.toString()}`));
  } catch (e) {
    console.log(e);
  }
};

publish();

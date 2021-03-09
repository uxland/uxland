const spawn = require('child_process').spawn;
const branchName = require('current-git-branch');

const preCommit = () => {
  let cmd;
  if (branchName() == 'master') cmd = spawn('yarn', ['precommit']);
  else cmd = spawn('echo', ['no pre-commit']);
  try {
    cmd.stdout && cmd.stdout.on('data', data => console.log(`stdout: ${data.toString()}`));
    cmd.stderr && cmd.stderr.on('data', data => console.log(`stderr: ${data.toString()}`));
    cmd.exit && cmd.exit.on('data', data => console.log(`child process exited with code: ${data.toString()}`));
  } catch (e) {
    console.log(e);
  }
};

preCommit();

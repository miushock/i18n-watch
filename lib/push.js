const path = require('path');
const nodegit = require('nodegit');

const {userInfo, tracklist} = require(path.resolve(process.cwd(), 'tracklist.json'));

const addAndCommit = require('./server/addAndCommit');
const push = require('./server/push');

module.exports = async function (repoDir) {
    // var repoDir = "hello-world.git";
    const userName = userInfo.userName;
    const userEmail = userInfo.email;
    const token = userInfo.token;
    const branch = tracklist[repoDir].branch;

    // try {
    const repository = await nodegit.Repository.open(path.resolve(process.cwd(), repoDir));
    const commitID = await addAndCommit(repository, userName, userEmail);
    // console.log(commitID, '####');

    // console.log(branch, 'branchbranch');
    // console.log(token, 'tokentoken');
    await push(repository, 'origin', branch, token);

    console.log('Push Done!')

};
// exports.commitAllFiles = commitAllFiles
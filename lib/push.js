const path = require('path');
const nodegit = require('nodegit');

// const getChangesByStatus = require('./getChangesByStatus')

async function getChangesByStatus(repository) {
    const statuses = await repository.getStatus()
    const changes = new Set()
    statuses.forEach(status => {
        const path = status.path()
        if (status.isNew() || status.isModified() || status.isDeleted() || status.isTypechange() || status.isRenamed()) {
            changes.add(path)
        }
    })
    return changes
}


async function addAndCommit(repository, userName, userEmail) {
    const changes = await getChangesByStatus(repository)
    let commitId
    if (changes.size === 0) {
        console.log('nothing to commit, working tree clean')
    } else {
        const signature = nodegit.Signature.now(userName, userEmail)
        commitId = await commitAllFiles(repository, changes, signature)
        console.log('[i18n nodeigt]: commitId - ', commitId)
        // const errorCode = await push(repository)

        // if (errorCode == null) {
        //   console.log(`[nodegit i18n] push success! ${commitId}`)
        // }
    }
    return commitId
}

async function commitAllFiles(repository, changes, signature) {
    const indexResult = await repository.refreshIndex()
    const oidResult = await indexResult.addAll().then(() => indexResult.write()).then(() => indexResult.writeTree())
    const head = await nodegit.Reference.nameToId(repository, 'HEAD')
    const parent = await repository.getCommit(head)
    const commitMsg = `[nodegit i18n] commit ${changes.size} changes.`
    console.log(commitMsg, [...changes])
    const oid = await repository.createCommit('HEAD', signature, signature, commitMsg, oidResult, [parent])
    return oid.tostrS()
}

async function push(repository, remote, branch, token) {
    const remoteResult = await repository.getRemote(remote)
    let refSpecs = await remoteResult.getPushRefspecs()

    if (refSpecs.length === 0) {
        const refSpec = `refs/heads/${branch}:refs/heads/${branch}`
        nodegit.Remote.addPush(repository, 'origin', refSpec)
        refSpecs = [refSpec]
    }

    const result = await remoteResult.push(
        refSpecs,
        {
            callbacks: {
                credentials() {
                    return nodegit.Cred.userpassPlaintextNew(token, 'x-oauth-basic')
                },
                // credentials: function(url, userName) {
                //     return nodegit.Cred.sshKeyFromAgent(userName);
                // }
            },
        }
    )
    return result
}

module.exports = async function (args) {
    var repoDir = "hello-world.git";
    const userName = 'liu-kai-github';
    const userEmail = 'liukaiemailchina@gmail.com';

    // try {
    const repository = await nodegit.Repository.open(path.resolve(process.cwd(), repoDir));
    const commitID = await addAndCommit(repository, userName, userEmail);
    console.log(commitID, '####');
    // } catch (e) {
    //     console.log(e, 'EEEEEEE');
    // }

    // return;

    const remote = await nodegit.Remote.createAnonymous(repository, 'https://github.com/liu-kai-github/hello-world.git');

    // const refspec = `refs/heads/test:refs/heads/test`;
    // const refSpecs = [`refs/heads/test:refs/heads/test`];

    await push(repository, 'origin', 'test', '688faaab1e6340f9e14b0c94ec9224b625f55a41');

};
// exports.commitAllFiles = commitAllFiles
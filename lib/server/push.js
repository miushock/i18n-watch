'use strict'
const nodegit = require('nodegit')

async function push(repository, remote, branch, token) {
  const remoteResult = await repository.getRemote(remote)
  let refSpecs = await remoteResult.getPushRefspecs()

  if (refSpecs.length === 0) {
    const refSpec = `refs/heads/${branch}:refs/heads/${branch}`
    nodegit.Remote.addPush(repository, 'origin', refSpec)
    refSpecs = [ refSpec ]
  }

  const result = await remoteResult.push(
    refSpecs,
    {
      callbacks: {
        credentials() {
          return nodegit.Cred.userpassPlaintextNew(token, 'x-oauth-basic')
        },
      },
    }
  )
  return result
}
module.exports = push

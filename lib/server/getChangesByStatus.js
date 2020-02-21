'use strict'

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

module.exports = getChangesByStatus

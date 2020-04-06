import * as core from '@actions/core'
import {
  getProjectName,
  getColumnName,
  getAssigneesLoginFromConfig,
  getAssignableCardInfo,
  getAssignableCardNodeId,
  getProjectCardNodeId
} from './libs'
import {
  removeAssigneesFromAssignable,
  addAssigneesToAssignable
} from './usecases'
import {prettyStringify} from './utils'

export async function assign(): Promise<void> {
  const cardNodeId = getProjectCardNodeId()
  if (!cardNodeId) {
    throw Error('Not found cardNodeId.')
  }

  const assignableInfo = await getAssignableCardInfo(cardNodeId)
  const assignableNodeId = getAssignableCardNodeId(assignableInfo)
  const projectName = getProjectName(assignableInfo)
  const columnName = getColumnName(assignableInfo)
  const expectedAssigneesLogin = await getAssigneesLoginFromConfig({
    projectName,
    columnName
  })

  core.info(`assignableInfo: ${prettyStringify(assignableInfo)}`)

  /**
   * Remove all existing assignees on the card.
   */
  await removeAssigneesFromAssignable({
    assignableInfo,
    assignableId: assignableNodeId
  })

  /**
   * Add expected assignees to the card.
   */
  await addAssigneesToAssignable({
    expectedAssigneesLogin,
    assignableId: assignableNodeId
  })
}

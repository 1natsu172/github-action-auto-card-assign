import * as core from '@actions/core'
import {
  getProjectName,
  getColumnName,
  getAssigneesLoginFromConfig,
  getAssignableCardInfo,
  getAssignableCardNodeId,
  getAssigneesUserInfo,
  getAssigneesNodeIdFromUserInfo
} from './libs'
import {
  removeAssigneesFromAssignable,
  addAssigneesToAssignable
} from './usecases'

export async function assign(): Promise<void> {
  const cardNodeId = getAssignableCardNodeId()
  if (!cardNodeId) {
    throw Error('Not found cardNodeId.')
  }
  const assignableInfo = await getAssignableCardInfo(cardNodeId)
  // console.log(JSON.stringify(assignableInfo, null, 2))

  const projectName = getProjectName(assignableInfo)
  const columnName = getColumnName(assignableInfo)
  const expectedAssigneesLogin = await getAssigneesLoginFromConfig({
    projectName,
    columnName
  })

  /**
   * Remove all existing assignees on the card.
   */
  await removeAssigneesFromAssignable(assignableInfo)

  /**
   * Add expected assignees to the card.
   */
  await addAssigneesToAssignable(expectedAssigneesLogin)
}

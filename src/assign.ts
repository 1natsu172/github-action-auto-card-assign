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

  /**
   * Remove all existing assignees on the card.
   */
  const removeAssigneesResult = await removeAssigneesFromAssignable({
    assignableInfo,
    assignableId: assignableNodeId
  })
  console.log(
    'removeAssigneesResult',
    JSON.stringify(removeAssigneesResult, null, 2)
  )

  /**
   * Add expected assignees to the card.
   */
  const addAssigneesResult = await addAssigneesToAssignable({
    expectedAssigneesLogin,
    assignableId: assignableNodeId
  })
  console.log('addAssigneesResult', JSON.stringify(addAssigneesResult, null, 2))
}

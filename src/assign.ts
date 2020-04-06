import * as core from '@actions/core'
import {
  getCardNodeId,
  getProjectName,
  getColumnName,
  getAssigneeNodeId
} from './params'
import {
  getAssigneesLoginFromConfig,
  getAssignableCardInfo,
  getAssigneesUserInfo
} from './libs'

export async function assign(): Promise<void> {
  const cardNodeId = getCardNodeId()
  if (!cardNodeId) {
    throw Error('Not found cardNodeId.')
  }
  const assinableInfo = await getAssignableCardInfo(cardNodeId)
  // console.log(JSON.stringify(assinableInfo, null, 2))

  const projectName = getProjectName(assinableInfo)
  const columnName = getColumnName(assinableInfo)
  const expectAssigneesLogin = await getAssigneesLoginFromConfig({
    projectName,
    columnName
  })

  console.log('ex-assigneeLogin', expectAssigneesLogin)
  const assigneesUserInfo = await getAssigneesUserInfo(expectAssigneesLogin)
  console.log('ex-infos', assigneesUserInfo)

  const expectAssigneesNodeId = assigneesUserInfo.map(getAssigneeNodeId)
  console.log('ex-assigneeNodeId', expectAssigneesNodeId)
}

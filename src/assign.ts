import * as core from '@actions/core'
import {
  getAssignableCardInfo,
  getCardNodeId,
  getProjectName,
  getColumnName
} from './params'
import {getAssigneesFromConfig} from './libs/getAssignees'

export async function assign(): Promise<void> {
  const cardNodeId = getCardNodeId()
  if (!cardNodeId) {
    throw Error('Not found cardNodeId.')
  }
  const assinableInfo = await getAssignableCardInfo(cardNodeId)
  // console.log(JSON.stringify(assinableInfo, null, 2))

  const projectName = getProjectName(assinableInfo)
  const columnName = getColumnName(assinableInfo)
  const expectAssignees = await getAssigneesFromConfig({
    projectName,
    columnName
  })
  console.log('exassignee', expectAssignees)
}

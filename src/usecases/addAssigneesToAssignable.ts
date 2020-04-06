import {getAssigneesUserInfo, getAssigneesNodeIdFromUserInfo} from '../libs'

export async function addAssigneesToAssignable(
  expectedAssigneesLogin: string[]
): Promise<void> {
  console.log('ex-assigneeLogin', expectedAssigneesLogin)

  if (expectedAssigneesLogin.length) {
    const assigneesUserInfo = await getAssigneesUserInfo(expectedAssigneesLogin)

    console.log('ex-infos', assigneesUserInfo)

    const expectAssigneesNodeId = getAssigneesNodeIdFromUserInfo(
      assigneesUserInfo
    )

    console.log('ex-assigneeNodeId', expectAssigneesNodeId)
  }
}

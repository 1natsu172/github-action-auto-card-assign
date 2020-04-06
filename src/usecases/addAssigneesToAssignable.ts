import {
  getAssigneesUserInfo,
  getAssigneesNodeIdFromUserInfo,
  getGitHubToken,
  getOctokit
} from '../libs'
import {addAssigneesToAssignable as addAssignees} from '../mutations/addAssigneesToAssignable.graphql'

export async function addAssigneesToAssignable(params: {
  expectedAssigneesLogin: string[]
  assignableId: string
}): Promise<any> {
  const {expectedAssigneesLogin, assignableId} = params
  console.log('ex-assigneeLogin', expectedAssigneesLogin)

  if (expectedAssigneesLogin.length) {
    const assigneesUserInfo = await getAssigneesUserInfo(expectedAssigneesLogin)

    console.log('ex-infos', assigneesUserInfo)

    const expectedAssigneesNodeId = getAssigneesNodeIdFromUserInfo(
      assigneesUserInfo
    )

    console.log('ex-assigneeNodeId', expectedAssigneesNodeId)

    const token = getGitHubToken()
    const octokit = getOctokit(token)

    try {
      const res = await octokit.graphql({
        query: addAssignees,
        assignableId,
        assigneeIds: expectedAssigneesNodeId
      })
      return res as any
    } catch (error) {
      throw Error(error)
    }
  }
}

import {
  getAssigneesUserInfo,
  getAssigneesNodeIdFromUserInfo,
  getGitHubToken,
  getOctokit
} from '../libs'
import {addAssigneesToAssignable as addAssignees} from '../mutations/addAssigneesToAssignable.graphql'

// FIXME: infer return type mutation result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = any

export async function addAssigneesToAssignable(params: {
  expectedAssigneesLogin: string[]
  assignableId: string
}): Promise<Result> {
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
      return res as Result
    } catch (error) {
      throw Error(error)
    }
  }
}

import {AssignableCardInfo} from '../types'
import {
  getAssigneesNodeIdFromAssignableCardInfo,
  getGitHubToken,
  getOctokit
} from '../libs'
import {removeAssigneesFromAssignable as removeAssignees} from '../mutations/removeAssigneesFromAssignable.graphql'

// FIXME: infer return type mutation result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = any

export async function removeAssigneesFromAssignable(params: {
  assignableInfo: AssignableCardInfo
  assignableId: string
}): Promise<Result> {
  const {assignableId, assignableInfo} = params
  const removeAssigneesNodeId = getAssigneesNodeIdFromAssignableCardInfo(
    assignableInfo
  )

  console.log('info', JSON.stringify(assignableInfo, null, 2))
  console.log('id', assignableId)

  console.log('removeAssignees', removeAssigneesNodeId)

  if (removeAssigneesNodeId.length) {
    const token = getGitHubToken()
    const octokit = getOctokit(token)

    try {
      const res = await octokit.graphql({
        query: removeAssignees,
        assignableId,
        assigneeIds: removeAssigneesNodeId
      })
      return res as Result
    } catch (error) {
      throw Error(error)
    }
  }
}

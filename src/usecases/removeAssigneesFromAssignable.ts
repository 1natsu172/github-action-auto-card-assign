import {AssignableCardInfo} from '../types'
import {
  getAssigneesNodeIdFromAssignableCardInfo,
  getGitHubToken,
  getOctokit
} from '../libs'
import {removeAssigneesFromAssignable as removeAssignees} from '../mutations/removeAssigneesFromAssignable.graphql'

export async function removeAssigneesFromAssignable(params: {
  assignableInfo: AssignableCardInfo
  assignableId: string
}): Promise<any> {
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
      return res as any
    } catch (error) {
      throw Error(error)
    }
  }
}

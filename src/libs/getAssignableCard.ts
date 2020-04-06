import {getOctokit} from './getOctokit'
import {getGitHubToken} from './getConfig'
import {assignableCardInfo} from '../queries/assignableCardInfo.graphql'
import {AssignableCardInfo} from '../types'

export async function getAssignableCardInfo(
  id: string
): Promise<AssignableCardInfo> {
  const token = getGitHubToken()
  const octokit = getOctokit(token)

  try {
    const res = await octokit.graphql({
      query: assignableCardInfo,
      id
    })
    return res as AssignableCardInfo
  } catch (error) {
    throw Error(error)
  }
}

export function getAssignableCardNodeId(obj: AssignableCardInfo): string {
  return obj.node.content.id
}

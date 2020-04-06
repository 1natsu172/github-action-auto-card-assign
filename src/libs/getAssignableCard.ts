import {context} from '@actions/github'
import {WebhookPayloadProjectCardProjectCard} from '@octokit/webhooks'
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

export function getAssignableCardNodeId(): string | undefined {
  return (context.payload?.project_card as WebhookPayloadProjectCardProjectCard)
    ?.node_id
}

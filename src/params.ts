import {context} from '@actions/github'
import {WebhookPayloadProjectCardProjectCard} from '@octokit/webhooks'
import {getOctokit} from './libs/getOctokit'
import {getGitHubToken} from './libs/getConfig'
import {assignableCardInfo} from './queries/assignableCardInfo.graphql'
import {AssignableCardInfo} from './types/assignableCardInfo'

export function getCardNodeId(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return (context.payload?.project_card as WebhookPayloadProjectCardProjectCard)
    .node_id
}

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

export function getProjectName(obj: AssignableCardInfo): string {
  return obj.node.project.name
}

export function getColumnName(obj: AssignableCardInfo): string {
  return obj.node.column.name
}

import {context} from '@actions/github'
import {WebhookPayloadProjectCardProjectCard} from '@octokit/webhooks'
import {AssignableCardInfo, UserInfo} from './types'

export function getCardNodeId(): string | undefined {
  return (context.payload?.project_card as WebhookPayloadProjectCardProjectCard)
    ?.node_id
}

export function getProjectName(obj: AssignableCardInfo): string {
  return obj.node.project.name
}

export function getColumnName(obj: AssignableCardInfo): string {
  return obj.node.column.name
}

export function getAssigneeNodeId(obj: UserInfo): string {
  return obj.user.id
}

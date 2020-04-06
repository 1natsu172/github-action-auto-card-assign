import {context} from '@actions/github'
import {WebhookPayloadProjectCardProjectCard} from '@octokit/webhooks'

export function getProjectCardNodeId(): string | undefined {
  return (context.payload?.project_card as WebhookPayloadProjectCardProjectCard)
    ?.node_id
}

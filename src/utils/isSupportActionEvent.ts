import {context} from '@actions/github'
import {SUPPORT_ACTION_EVENT} from '../constants'

export function isSupportActionEvent(): boolean {
  const hasProjectCardContext = context.payload?.project_card
  const isSupportEvent = SUPPORT_ACTION_EVENT.some(
    (event) => event === context.payload.action
  )
  return hasProjectCardContext && isSupportEvent
}

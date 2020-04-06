import {FLAG_KEYWORD} from '../constants'

export function isSkipAction(message: string): boolean {
  return message.includes(FLAG_KEYWORD.SKIP_ACTION)
}

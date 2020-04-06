import {FLAG_KEYWORD} from '../constants'

export function createSkipActionMessage(message: string): string {
  return `${FLAG_KEYWORD.SKIP_ACTION} ${message}`
}

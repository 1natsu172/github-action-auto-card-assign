import {AssignableCardInfo} from '../types'

export function getColumnName(obj: AssignableCardInfo): string {
  return obj.node.column.name
}

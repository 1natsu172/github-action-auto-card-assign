import {AssignableCardInfo} from '../types'

export function getProjectName(obj: AssignableCardInfo): string {
  return obj.node.project.name
}

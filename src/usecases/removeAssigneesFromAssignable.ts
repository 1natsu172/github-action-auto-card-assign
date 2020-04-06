import {AssignableCardInfo} from '../types'
import {getAssigneesNodeIdFromAssignableCardInfo} from '../libs'

export async function removeAssigneesFromAssignable(
  assignableInfo: AssignableCardInfo
): Promise<void> {
  const removeAssigneesNodeId = getAssigneesNodeIdFromAssignableCardInfo(
    assignableInfo
  )

  if (removeAssigneesNodeId.length) {
    // remove mutation
  }
}

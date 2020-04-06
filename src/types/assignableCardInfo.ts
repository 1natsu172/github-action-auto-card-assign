import {
  assignableIssue,
  assignablePullRequest
} from '../fixtures/assignableCardInfo.json'

/**
 * FIXME: How to infer RerturnType by query?
 */
export type AssignableCardInfo =
  | typeof assignableIssue
  | typeof assignablePullRequest

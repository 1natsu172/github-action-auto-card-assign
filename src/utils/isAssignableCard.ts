import {context} from '@actions/github'

/**
 * @description
 * AssignableCard(PR/Issue)'s note is `null`
 */ export function isAssignableCard(): boolean {
  const projectCardNote = context.payload?.project_card?.note
  return projectCardNote === null
}

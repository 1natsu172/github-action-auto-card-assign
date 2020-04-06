import * as core from '@actions/core'
import {
  getAssigneesUserInfo,
  getAssigneesNodeIdFromUserInfo,
  getGitHubToken,
  getOctokit
} from '../libs'
import {addAssigneesToAssignable as addAssignees} from '../mutations/addAssigneesToAssignable.graphql'
import {prettyStringify} from '../utils'

// FIXME: infer return type mutation result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = any

export async function addAssigneesToAssignable(params: {
  expectedAssigneesLogin: string[]
  assignableId: string
}): Promise<Result> {
  const {expectedAssigneesLogin, assignableId} = params

  core.info(
    `expectedAssigneesLogin' ${prettyStringify(expectedAssigneesLogin)}`
  )

  if (expectedAssigneesLogin.length) {
    const assigneesUserInfo = await getAssigneesUserInfo(expectedAssigneesLogin)

    core.info(
      `expectedAssigneesUserInfo: ${prettyStringify(assigneesUserInfo)}`
    )

    const expectedAssigneesNodeId = getAssigneesNodeIdFromUserInfo(
      assigneesUserInfo
    )

    const token = getGitHubToken()
    const octokit = getOctokit(token)

    try {
      const res = await octokit.graphql({
        query: addAssignees,
        assignableId,
        assigneeIds: expectedAssigneesNodeId
      })

      core.info(`res:addAssignees: ${prettyStringify(res)}`)

      return res as Result
    } catch (error) {
      throw Error(error)
    }
  }
}

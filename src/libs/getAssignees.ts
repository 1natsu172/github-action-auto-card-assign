import {getConfig, getGitHubToken} from './getConfig'
import {getOctokit} from './getOctokit'
import {userInfo} from '../queries/userInfo.graphql'
import {UserInfo, AssignableCardInfo} from '../types'
import {checkConfiguredColumn} from '../utils'

export async function getAssigneesLoginFromConfig(params: {
  projectName: string
  columnName: string
}): Promise<string[]> {
  const {projectName, columnName} = params
  const config = await getConfig()

  try {
    await checkConfiguredColumn({projectName, columnName})
  } catch (error) {
    throw Error(error)
  }

  return config[projectName][columnName]
}

export async function getAssigneesUserInfo(
  assigneesLogin: string[]
): Promise<UserInfo[]> {
  const token = getGitHubToken()
  const octokit = getOctokit(token)

  try {
    return Promise.all(
      assigneesLogin.map(
        async (assigneeLogin) =>
          (await octokit.graphql({
            query: userInfo,
            login: assigneeLogin
          })) as UserInfo
      )
    )
  } catch (error) {
    throw Error(error)
  }
}

export function getAssigneesNodeIdFromUserInfo(params: UserInfo[]): string[] {
  return params.map((u) => u.user.id)
}

export function getAssigneesNodeIdFromAssignableCardInfo(
  obj: AssignableCardInfo
): string[] {
  return obj.node.content.assignees.nodes.map((n) => n.id)
}

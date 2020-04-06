import {getConfig, getGitHubToken} from './getConfig'
import {getOctokit} from './getOctokit'

import {userInfo} from '../queries/userInfo.graphql'
import {UserInfo} from '../types'

export async function getAssigneesLoginFromConfig(params: {
  projectName: string
  columnName: string
}): Promise<string[]> {
  const {projectName, columnName} = params
  const config = await getConfig()

  if (!(projectName in config)) {
    throw Error(
      `The project name "${projectName}" is not defined in the config.`
    )
  }

  if (!(columnName in config[projectName])) {
    throw Error(`Column name "${columnName}" not defined in config.`)
  }

  return config[projectName][columnName] || []
}

export async function getAssigneesUserInfo(
  assigneesLogin: string[]
): Promise<UserInfo[]> {
  const token = getGitHubToken()
  const octokit = getOctokit(token)

  try {
    return Promise.all(
      assigneesLogin.map(
        async assigneeLogin =>
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

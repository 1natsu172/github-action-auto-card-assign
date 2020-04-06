import {getConfig} from './getConfig'

export async function getAssigneesFromConfig(params: {
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

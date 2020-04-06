import {getConfig} from '../libs'
import {createSkipActionMessage} from '../utils'

export async function checkConfiguredColumn(params: {
  projectName: string
  columnName: string
}): Promise<void> {
  const {projectName, columnName} = params
  const config = await getConfig()

  const isConfiguredProjectName = projectName in config
  if (!isConfiguredProjectName) {
    throw Error(
      createSkipActionMessage(
        `The project name "${projectName}" is not defined in the config.`
      )
    )
  }

  const isConfiguredColumnName = columnName in config[projectName]
  if (!isConfiguredColumnName) {
    throw Error(
      createSkipActionMessage(
        `The column name "${columnName}" is not defined in the config.`
      )
    )
  }
}

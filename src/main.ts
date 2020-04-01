import * as core from '@actions/core'
import {wait} from './wait'
import {getConfig} from './libs/getConfig'
import {getProjectName} from './libs/getProjectName'

async function run(): Promise<void> {
  try {
    const configParam = core.getInput('config')
    const ms: string = core.getInput('milliseconds')
    core.debug(configParam)
    // const  = await getConfig()
    getProjectName()
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

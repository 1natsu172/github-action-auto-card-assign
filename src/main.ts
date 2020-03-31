import * as core from '@actions/core'
import {wait} from './wait'
import {getConfig} from './libs/getConfig'

async function run(): Promise<void> {
  try {
    const config = core.getInput('config')
    const ms: string = core.getInput('milliseconds')
    core.debug(config)
    // eslint-disable-next-line no-console
    console.log(await getConfig())
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

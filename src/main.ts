import * as core from '@actions/core'
import {wait} from './wait'
import {getConfig} from './libs/getConfig'

async function run(): Promise<void> {
  try {
    const config = core.getInput('config')
    const ms: string = core.getInput('milliseconds')
    core.debug(config)
    // eslint-disable-next-line no-console
    const a = await getConfig()
    console.log(a)
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

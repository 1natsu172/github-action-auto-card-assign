import * as core from '@actions/core'
import {context} from '@actions/github'
import {Logger} from '@technote-space/github-action-helper'
import {wait} from './wait'
// import {getConfig} from './libs/getConfig'
import {assign} from './assign'
import {isSupportActionEvent} from './utils'

async function run(): Promise<void> {
  try {
    if (!isSupportActionEvent()) {
      throw Error('Triggered from can not support action event.')
    }

    const configParam = core.getInput('config')
    const ms: string = core.getInput('milliseconds')
    core.debug(configParam)
    await assign()
    // console.log(JSON.stringify(context, null, 2))
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.toString())
  }
}

run()

import * as core from '@actions/core'
import {context} from '@actions/github'
import {Logger} from '@technote-space/github-action-helper'
import {wait} from './wait'
// import {getConfig} from './libs'
import {assign} from './assign'
import {
  isSupportActionEvent,
  isAssignableCard,
  createSkipActionMessage
} from './utils'
import {thrownHandler} from './libs'

async function run(): Promise<void> {
  console.log(JSON.stringify(context, null, 2))

  try {
    if (!isSupportActionEvent()) {
      throw Error('Triggered from can not support action event.')
    }
    if (!isAssignableCard()) {
      throw Error(
        createSkipActionMessage('The triggered card is not assignable card.')
      )
    }

    const configParam = core.getInput('config')
    const ms: string = core.getInput('milliseconds')
    core.debug(configParam)
    await assign()
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    thrownHandler(error)
  }
}

run()

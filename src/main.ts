import * as core from '@actions/core'
import {context} from '@actions/github'
import {wait} from './wait'
import {assign} from './assign'
import {
  isSupportActionEvent,
  isAssignableCard,
  createSkipActionMessage,
  prettyStringify
} from './utils'
import {thrownHandler} from './libs'

async function run(): Promise<void> {
  core.startGroup('::debug::context')
  core.debug(prettyStringify(context))
  core.endGroup()

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

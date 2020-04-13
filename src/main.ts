import * as core from '@actions/core'
import {context} from '@actions/github'
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
  core.startGroup('::debug::config')
  core.debug(prettyStringify(core.getInput('config')))
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

    await assign()
  } catch (error) {
    thrownHandler(error)
  }
}

run()

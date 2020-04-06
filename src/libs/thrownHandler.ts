import * as core from '@actions/core'
import {isSkipAction} from '../utils'

export function thrownHandler(error: Error): void {
  if (isSkipAction(error.message)) {
    core.info(error.message)
    process.exitCode = core.ExitCode.Success
  } else {
    core.error(JSON.stringify(error, null, 2))
    core.setFailed(`Action failed with error ${error}`)
  }
}

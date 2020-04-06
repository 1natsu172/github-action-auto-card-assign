import * as core from '@actions/core'
import {isSkipAction, prettyStringify} from '../utils'

export function thrownHandler(error: Error): void {
  if (isSkipAction(error.message)) {
    core.info(error.message)
    process.exitCode = core.ExitCode.Success
  } else {
    core.error(prettyStringify(error))
    core.setFailed(`Action failed with error ${error}`)
  }
}

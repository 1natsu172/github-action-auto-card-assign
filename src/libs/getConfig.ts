import * as core from '@actions/core'
import {isObject} from 'lodash-es'
import {Config, ConfigNode} from '../types'

export function getConfig(): Config {
  const config: ConfigNode = core.getInput('config')
  core.debug(config)
  const parsed = JSON.parse(config)
  if (!isObject(parsed) || !(parsed instanceof Object)) {
    throw Error('config is malformed')
  }
  return parsed as Config
}

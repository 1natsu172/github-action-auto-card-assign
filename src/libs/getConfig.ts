import * as core from '@actions/core'
import {getConfig as getConfigObject} from '@technote-space/github-action-config-helper'
import isObject from 'lodash.isobject'
import {Config, ConfigPath} from '../types'
import {getOctokit} from './getOctokit'
import {context} from '@actions/github'

export function getGitHubToken(): string {
  const token = core.getInput('github_token')
  return token
}

export async function getConfig(): Promise<Config> {
  const configPath: ConfigPath = core.getInput('config')
  const token = getGitHubToken()
  const octokit = getOctokit(token)
  core.debug(configPath)
  const config = await getConfigObject(configPath, octokit, context)

  if (!config) {
    core.warning('Please create config file')
  }

  if (!isObject(config) || !(config instanceof Object)) {
    throw Error('config is malformed')
  }

  return config as Config
}

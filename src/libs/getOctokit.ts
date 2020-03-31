import {GitHub} from '@actions/github'

export function getOctokit(token: string): GitHub {
  return new GitHub(token)
}

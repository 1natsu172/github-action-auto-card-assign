import {createDummyGitHubContext} from '../helper/githubContextHelper'

/**
 * @description
 * `import {context} from '@actions/github'の中身をmockする
 */
export const mockGitHubContext = (): typeof jest => {
  const mock = jest.mock('@actions/github', () => {
    return {
      __esModule: true,
      context: createDummyGitHubContext()
    }
  })
  return mock
}

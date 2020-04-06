import {GitHubContext} from '../../src/types'
import {context as contextFixture} from '../../src/fixtures/context.json'

export const createDummyGitHubContext = (
  overrideContext: GitHubContext | {} = {}
): GitHubContext => {
  const obj = {
    ...contextFixture,
    ...overrideContext
  }
  return obj as GitHubContext
}

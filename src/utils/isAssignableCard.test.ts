// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {context} from '@actions/github'
import {isAssignableCard} from './isAssignableCard'
import {mockGitHubContext} from '../../__tests__/mock/actions-github.mock'
import {createDummyGitHubContext} from '../../__tests__/helper/githubContextHelper'

mockGitHubContext()

beforeEach(() => {
  jest.resetModules()
})

describe('isAssignableCard', () => {
  test('Should be return true if note property is null', () => {
    // @ts-ignore
    context = createDummyGitHubContext({
      payload: {project_card: {note: null}}
    })
    expect(isAssignableCard()).toBe(true)
  })

  test('should be return false if have value of note property', () => {
    // @ts-ignore
    context = createDummyGitHubContext({
      payload: {project_card: {note: 'hogefuga'}}
    })
    expect(isAssignableCard()).toBe(false)
  })

  test('should be return false if note property is undefined', () => {
    // @ts-ignore
    context = createDummyGitHubContext({
      payload: {project_card: {note: undefined}}
    })
    expect(isAssignableCard()).toBe(false)
  })
})

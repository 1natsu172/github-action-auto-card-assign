import {FLAG_KEYWORD} from '../constants'
import {isSkipAction} from './isSkipAction'

describe('isSkipAction', () => {
  const message = 'Error occured'
  test('case: skip', () => {
    expect(isSkipAction(`${FLAG_KEYWORD.SKIP_ACTION} ${message}`)).toBe(true)
  })
  test('case: not skip', () => {
    expect(isSkipAction(message)).toBe(false)
  })
})

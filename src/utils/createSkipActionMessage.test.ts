import {FLAG_KEYWORD} from '../constants'
import {createSkipActionMessage} from './createSkipActionMessage'

describe('createSkipActionMessage', () => {
  test('should to add a skip flag message to the message', () => {
    const message = 'yo'
    expect(createSkipActionMessage(message)).toEqual(
      expect.stringContaining(FLAG_KEYWORD.SKIP_ACTION)
    )
  })
})

import {getConfig} from '../libs'
import {checkConfiguredColumn} from './checkConfiguredColumn'
import {Config} from '../types'
import {FLAG_KEYWORD} from '../constants'

jest.mock('../libs/getConfig', () => {
  return {
    __esModule: true,
    getConfig: jest.fn()
  }
})
const mockedGetConfig = getConfig as jest.MockedFunction<typeof getConfig>

describe('checkConfiguredColumn', () => {
  const config: Config = {
    myProject1: {
      myColumn1: ['member1']
    }
  }

  describe('if not configured projectName', () => {
    mockedGetConfig.mockResolvedValueOnce(config)

    test('should be thrown', async () => {
      const actual = checkConfiguredColumn({
        projectName: 'to do board',
        columnName: 'John'
      })

      await expect(actual).rejects.toThrow('to do board')
      /**
       * 'thrown with SKIP_ACTION message'
       */
      await expect(actual).rejects.toThrow(FLAG_KEYWORD.SKIP_ACTION)
    })
  })

  describe('if not configured columnName', () => {
    mockedGetConfig.mockResolvedValueOnce(config)

    test('should be thrown', async () => {
      const actual = checkConfiguredColumn({
        projectName: 'myProject1',
        columnName: 'John'
      })
      await expect(actual).rejects.toThrow('John')
      /**
       * 'thrown with SKIP_ACTION message'
       */
      await expect(actual).rejects.toThrow(FLAG_KEYWORD.SKIP_ACTION)
    })
  })

  describe('configured projectName and columnName', () => {
    mockedGetConfig.mockResolvedValueOnce(config)

    test('should be resolve', async () => {
      const actual = checkConfiguredColumn({
        projectName: 'myProject1',
        columnName: 'myColumn1'
      })
      await expect(actual).resolves.toBe(undefined)
    })
  })
})

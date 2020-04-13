import {getConfig} from '../libs'
import {checkConfiguredColumn} from '../utils'
import {getAssigneesLoginFromConfig} from './getAssignees'
import {Config} from '../types'

jest.mock('../libs/getConfig.ts', () => {
  return {
    __esModule: true,
    getConfig: jest.fn()
  }
})
const mockedGetConfig = getConfig as jest.MockedFunction<typeof getConfig>

jest.mock('../utils/checkConfiguredColumn.ts', () => {
  return {
    __esModule: true,
    checkConfiguredColumn: jest.fn()
  }
})
const mockedCheckConfiguredColumn = checkConfiguredColumn as jest.MockedFunction<
  typeof checkConfiguredColumn
>

describe.only('getAssigneesLoginFromConfig', () => {
  const config: Config = {
    myProject1: {
      myColumn1: ['member1', 'member2', 'member3']
    }
  }

  test('get assignees from config by projectName and columnName', async () => {
    mockedGetConfig.mockResolvedValueOnce(config)

    await expect(
      getAssigneesLoginFromConfig({
        projectName: 'myProject1',
        columnName: 'myColumn1'
      })
    ).resolves.toStrictEqual(config['myProject1']['myColumn1'])
  })

  test('thrown if not configured projectName and columnName', async () => {
    mockedGetConfig.mockResolvedValueOnce(config)
    mockedCheckConfiguredColumn.mockRejectedValue(Error())

    await expect(
      getAssigneesLoginFromConfig({
        projectName: 'myProject1',
        columnName: 'bar'
      })
    ).rejects.toThrow()
    await expect(
      getAssigneesLoginFromConfig({
        projectName: 'foo',
        columnName: 'myColumn1'
      })
    ).rejects.toThrow()
    await expect(
      getAssigneesLoginFromConfig({
        projectName: 'foo',
        columnName: 'bar'
      })
    ).rejects.toThrow()
  })
})

import {context} from '@actions/github'

// eslint-disable-next-line @typescript-eslint/promise-function-async
export function getProjectName(): any {
  console.log(JSON.stringify(context, null, 2))
}

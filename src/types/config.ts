export type ConfigNode = string

export interface Config {
  [projectName: string]: {
    [columnName: string]: string[]
  }
}

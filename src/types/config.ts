export type ConfigPath = string

export interface Config {
  [projectName: string]: {
    [columnName: string]: string[]
  }
}

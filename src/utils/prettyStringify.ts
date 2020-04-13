/**
 * use for debugging.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prettyStringify(message: any): string {
  return JSON.stringify(message, null, 2)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 校验用户账号
 * @param str
 * @returns
 */
export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

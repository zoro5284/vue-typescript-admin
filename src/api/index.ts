/**
 * @ Description:全局注册api
 * @ Author: zoro5284
 * @ Date: 2022-07-28 16:51:05
 * @ LasterEditor: zoro5284
 * @ Modified time: 2022-07-28 17:37:15
 */
import Generator from './generator'

const files = require.context('./modules', false, /\.ts$/)
const config: any = {}
files.keys().forEach((key: string) => {
  const matched = key.match(/^\.\/([^\s]+)\.ts$/)
  if (matched && matched[1]) {
    const camelModuleName = matched[1].replace(/-(\w)/g, (_, c) => {
      return c ? c.toUpperCase() : ''
    })
    config[camelModuleName] = files(key).default
  }
})
export default new Generator(config).api

import { param2Obj } from '@/utils/util'
const Mock = require('mockjs')
interface Mock {
    url: string
    type?: string
    response: Function

}
export function succDecoration (res: any) {
  return {
    res_info: 'OK',
    result: 0,
    result_rows: res
  }
}
export function failDecoration (res: any, resInfo = 'FAIL') {
  return {
    res_info: resInfo,
    result: 'error-code',
    result_row: res
  }
}

const files = require.context('./', false, /\.ts$/)
const mocks: Array<Mock> = files.keys().reduce((mock, key: string) => {
  if (key === './index.ts') return mock
  return mock.concat(files(key).default)
}, [])

const mockXHR = function () {
  function responseWrap (respond: Function): Function {
    return function (options: any) {
      let result
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'post', responseWrap(i.response))
  }
}

export {
  mockXHR
}

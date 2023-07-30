import axios, { axiosOptions } from './axios'

interface requestConfig {
  url: string
  method: string
  data?: object
  params?: object
}

export default class Generator {
  api: any
  constructor (modules: object) {
    this.api = {}
    this.apiGenerator(modules)
  }

  // 遍历所有模块，在this.api上定义模块
  apiGenerator (modules: any) {
    Object.keys(modules).forEach(moduleName => {
      Object.defineProperty(this.api, moduleName, {
        value: {}
      })
      this.singleGenerator(this.api[moduleName], modules[moduleName])
    })
  }

  // 遍历单个模块所有接口，定义到该模块上
  singleGenerator (namespace: object, module: any) {
    Object.keys(module).forEach((apiName: string) => {
      Object.defineProperty(namespace, apiName, {
        value: (data: any, options: axiosOptions = {}) => {
          const method = (options.method && options.method.toUpperCase()) || 'POST'
          const config: requestConfig = {
            url: module[apiName],
            method
          }
          if (method === 'POST') {
            config.data = data
          } else if (method === 'GET') {
            config.params = data
          }
          return axios(options)(config)
        }
      })
    })
  }
}

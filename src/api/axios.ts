/**
 * @ Description: axios封装
 * @ Author: zoro5284
 * @ Date: 2022-07-28 14:59:23
 * @ LasterEditor: zoro5284
 * @ Modified time: 2023-07-29 14:46:21
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// axios默认配置
const AXIOS_DEFAULT_CONFIG = {
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-9'
  }
}
const Toast = (message: string) => {
  ElMessage.error(message)
}

export interface axiosOptions{
  method?: string
  silent?: boolean
  system?: any
}

// 自定义配置
let options: axiosOptions = {}

// 请求成功拦截
function requestSuccess (request: AxiosRequestConfig) {
  request.data = {
    system: options.system || {},
    data: request.data || {}
  }
  return request
}
// 请求失败拦截
function requestFail (error: AxiosError) {
  Toast(`${error.message} in ${error.config.baseURL}${error.config.url}`)
  return Promise.reject(error)
}
// 响应成功拦截 TODO: init mockserver
function responseSuccess (response: AxiosResponse) {
  const { data: res } = response

  if (res.result === 0) {
    return res.result_rows
  } else if (!options.silent) {
    Toast(`${res.result} ${res.res_info || ''}`)
  }
  return Promise.reject(res)
}

// 响应失败拦截
function responseFail (error: AxiosError) {
  Toast('network error')
  return Promise.reject(error)
}

// 创建axios实例
const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)
axiosInstance.interceptors.request.use(requestSuccess, requestFail)
axiosInstance.interceptors.response.use(responseSuccess, responseFail)

export default (opt = {}) => {
  options = opt
  return axiosInstance
}

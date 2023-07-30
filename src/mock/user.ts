import { succDecoration, failDecoration } from './index'
interface Config {
    method: string
    body: any
    query: any
}
export default [
  // 校验登录态
  {
    url: '/api/check_login_state.json',
    response: (config: Config) => {
      const { username, password } = config.body.data
      if (username === 'admin' && password === '123456') {
        return succDecoration({
          login_state: 1,
          token: username + '-token'
        })
      } else {
        return failDecoration({ login_state: 0 }, '账号或密码输入错误')
      }
    }
  },
  // 获取当前登录用户
  {
    url: '/api/get_user_info.json',
    response: (config: Config) => {
      const { token } = config.body.data
      if (/-token$/.test(token)) {
        return succDecoration({
          username: 'jzy',
          avatar: 'https://avatar.png'
        })
      } else {
        return failDecoration(null, 'token失效')
      }
    }
  }
]

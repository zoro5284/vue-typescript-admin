import { ActionContext } from 'vuex'
import { RootStateType } from '@/store'
import { delToken, getToken, setToken } from '@/utils/cookies'
import api from '@/api'
export interface StateType {
  token: string,
  name: string,
  avatar: string,
  introduction: string,
  roles: string[],
  email: string
}

const state: StateType = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}
const getters = {}
const mutations = {
  setUserInfo (state: StateType, userInfo: any) {
    const { name, avatar, introduction, roles, email } = userInfo
    state.name = name
    state.avatar = avatar
    state.introduction = introduction
    state.roles = roles
    state.email = email
  },
  setToken (state: StateType, token: string) {
    state.token = token
  }
}
const actions = {
  loginAction: async ({ commit }: ActionContext<StateType, RootStateType>, userInfo: {username: string, password: string}) => {
    const res = await api.user.checkLoginState(userInfo)
    if (res.token) {
      setToken(res.token)
      commit('setToken', res.token)
    }
  },
  getUserInfo: async ({ commit }: ActionContext<StateType, RootStateType>, token: string) => {
    const userInfo = await api.user.getUserInfo({ token })
    commit('setUserInfo', userInfo)
  },
  loginOut: async ({ commit }: ActionContext<StateType, RootStateType>, token: string) => {
    delToken()
    console.log('deleted')
    commit('setToken')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

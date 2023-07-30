export interface StateType {
    isCollapse: boolean
}
const state: StateType = {
  isCollapse: false
}

const mutations = {
  toggleCollapse (state: StateType, flag: boolean) {
    state.isCollapse = flag
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import UserState, { StateType as UserStateType } from '@/store/modules/user'
import AppState, { StateType as AppStateType } from '@/store/modules/app'

export interface RootStateType {
  user: UserStateType,
  app: AppStateType
}

export const key: InjectionKey<Store<RootStateType>> = Symbol()

const modules = {
  user: UserState,
  app: AppState
}
export const store = createStore<RootStateType>({
  modules
})

export function useStore () {
  return baseUseStore(key)
}

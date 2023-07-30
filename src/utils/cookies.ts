import Cookies from 'js-cookie'

export const delToken = () => {
  Cookies.remove('vue3-typescript-admin')
}
export const setToken = (token: string) => {
  Cookies.set('vue3-typescript-admin', token)
}
export const getToken = () => Cookies.get('vue3-typescript-admin')

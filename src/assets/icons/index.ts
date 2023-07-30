import { createApp } from 'vue'
import SvgIcon from '@/components/svg-icon/Index.vue'
/**
 * @description 加载所有svg-icon
 * @param {ReturnType<typeof createApp>} app 应用实例
 */
export function loadAllIcons (app: ReturnType<typeof createApp>) {
  app.component('SvgIcon', SvgIcon)

  const req = require.context('./svg', false, /\.svg$/)
  const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
  requireAll(req)
}

<!--
 * @ Description: svg-icon
 * @ Author: zoro5284
 * @ Date: 2022-07-27 10:13:59
 * @ LasterEditor: zoro5284
 * @ Modified time: 2023-07-28 17:33:48
 -->
<template>
  <div
    v-if="isIconExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
  inheritAttrs: false,
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  name: 'SvgIcon',
  setup (props) {
    const isIconExternal = computed(() => isExternal(props.iconClass))
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => props.className ? 'svg-icon ' + props.className : 'svg-icon')
    const styleExternalIcon = computed(() => ({ mask: `url(${props.iconClass}) no-repeat 50% 50%`, '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%` }))
    return {
      isIconExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style lang='scss' scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon{
  background-color: currentColor;
  mask-size: cover;
  display: inline-block;
}

</style>

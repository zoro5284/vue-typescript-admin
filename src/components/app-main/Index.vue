<template>
 <div>
    <div class="header">
      <el-icon @click="toggleSidebar">
         <component :is="isCollapse ? 'ArrowRight' : 'ArrowLeft'"></component>
      </el-icon>
    </div>
    <router-view></router-view>
 </div>
</template>

<script lang='ts' setup>
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => {
  return store.state.app.isCollapse
})
const toggleSidebar = () => {
  store.commit('app/toggleCollapse', !isCollapse.value)
}
</script>

<style lang='scss' scoped>

</style>

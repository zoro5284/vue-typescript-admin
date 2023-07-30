<template>
  <el-container class="app-wrapper">
      <side-bar />
      <div class="main-container">
        <keep-alive>
          <app-main />
        </keep-alive>
      </div>
  </el-container>
</template>

<script lang='ts' setup>
import AppMain from '@/components/app-main/Index.vue'
import SideBar from '@/components/side-bar/Index.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
</script>

<style lang='scss' scoped>
.app-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

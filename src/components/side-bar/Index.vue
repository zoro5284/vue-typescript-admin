<template>
    <el-menu router :collapse="isCollapse">
        <el-sub-menu v-for="route in routeSideBar" :key="route.title" :index="route.title">
            <template v-slot:title>
              <el-icon>
                <component :is="route.icon" />
              </el-icon>
              <span>{{ route.title }}</span>
            </template>
            <el-menu-item-group>
                <template v-for="routeItem in route.children" :key="routeItem.path">
                    <el-menu-item :index="routeItem.path">
                        {{routeItem.title}}
                    </el-menu-item>
                </template>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang='ts' setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const isCollapse = computed(() => {
  return store.state.app.isCollapse
})

const routeSideBar = reactive([
  {
    title: 'node示例',
    icon: 'location',
    children: [
      { path: '/node/node-demo-1', title: 'node示例1' },
      { path: '/node/node-demo-2', title: 'node示例2' }
    ]
  }
])

</script>

<style lang='scss' scoped>

</style>

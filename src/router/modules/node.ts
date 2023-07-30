import Layout from '@/layout/Index.vue'
export default [
  {
    path: '',
    name: 'node',
    component: Layout,
    children: [
      {
        path: 'node-demo-1',
        name: 'nodeDemo1',
        component: () => import(/* webpackChunkName: "nodeDemo1" */ '@/views/node/Demo1.vue'),
        meta: {
          title: 'node-demo-1'
        }
      },
      {
        path: 'node-demo-2',
        name: 'nodeDemo2',
        component: () => import(/* webpackChunkName: "nodeDemo2" */ '@/views/node/Demo2.vue'),
        meta: {
          title: 'node-demo-2'
        }
      }
    ]
  }
]

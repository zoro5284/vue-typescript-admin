const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')

const dev = process.env.NODE_ENV === 'development'
const mockServerPort = 9527

module.exports = defineConfig(
  {
    publicPath: dev ? '/' : '/dist/prod',
    outputDir: resolve(__dirname, './dist/prod'),
    lintOnSave: true,
    devServer: {
      hot: true,
      open: true,
      port: '8088',
      proxy: {
        '/api': {
          // url含 api 会被代理到 http://127.0.0.1:9527/api
          // e.g. http://a.com/api/getList.jon  => http://127.0.0.1:9527/api/getList.json
          target: `http://127.0.0.1:${mockServerPort}/api/`,
          changeOrigin: true // 请求的时候会改变origin为target的origin todo（确认一下origin是怎么样的）
        }
      }
    },
    css: {
      // 相当于全局引入，不需要单独在页面中去引入这个文件。
      loaderOptions: {
        scss: {
          additionalData: `
          @import "~@/styles/_variables.scss";
          @import "~@/styles/_mixins.scss";
        `
        }
      }
    },
    chainWebpack (config) {
      config.module
      // 禁用内部的svg指令
        .rule('svg')
        .exclude.add(resolve('src/assets/icons/svg'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/icons/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
      config.plugin('html').tap(args => {
        args[0].scriptLoading = 'blocking'
        return args
      })
      config.optimization.runtimeChunk('single')
    }
  }

)

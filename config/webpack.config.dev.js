const path = require('path')
const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.config')

/** @type {import('webpack').Configuration} */
module.exports = () => {
  return merge(webpackBase, {
    mode: 'development',

    // 使用 source map 仅用于开发环境
    devtool: 'inline-source-map',

    devServer: {
      static: {
        directory: path.join(__dirname, '..', 'dist', 'public')
      },
      // host: '0.0.0.0',
      hot: true,
      port: 9527,
      open: true
    }
  })
}

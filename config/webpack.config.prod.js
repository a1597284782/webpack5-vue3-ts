const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.config')
// 这个插件使用 cssnano 优化和压缩 CSS。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 该插件使用 terser 来压缩 JavaScript
const TerserPlugin = require('terser-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = () => {
  return merge(webpackBase, {
    mode: 'production',

    devtool: undefined,

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/[contenthash].css'
      })
    ],
    
    // 优化
    optimization: {
      runtimeChunk: 'single',
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            // 去掉 console.log
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.error']
            }
          }
        })
      ],
      // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  })
}

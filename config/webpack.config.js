const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.join(__dirname, '..', 'src', 'main.ts'),

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'scripts/[name].[contenthash].js',
    // 清理之前的文件
    clean: true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      '@': path.join(__dirname, '..', 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.join(__dirname, '..', 'src'),
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/i,
        use: ['babel-loader'],
        include: path.join(__dirname, '..', 'src')
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          /**
           * 生产环境将 css 提取出来
           * 不要同时使用 style-loader 与 mini-css-extract-plugin
           * https://webpack.docschina.org/plugins/mini-css-extract-plugin/#recommend
           */
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        generator: {
          filename: 'style/[hash][ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    // eslint
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'js', 'vue'],
      exclude: ['node_modules', 'public', 'dist']
    }),
    new VueLoaderPlugin(),
    // 生成 html 模板
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico',
      // 模板
      template: 'public/index.html',
      // script 标签在 body 里面
      inject: 'body'
    }),
    // 定义全局变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: process.env.NODE_ENV }),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    })
  ]
}

const path = require('path');
const webpack = require('webpack');
const HtmlWebpack = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 通过设置环境变量来告诉webpack我们在development模式下不需要提取css到单独在文件，只有当不是development下（也即是production）才需要提取文件。
// 其实应该是写两套方案 这里做判断使用
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  // 先介绍单入口的写法
  entry: "./src/index.js",
  // 上面这样的写法是下面的简写
  /*
  entry: {
    main: "./index.js"
  },
  */
  output: {
    // 指定打包后的文件名字
    filename: "bundle.js",
    //  打包后的文件路径
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    open: true,
    hot: true,
    proxy: {
      '/api/': {
        target: "http://xxx",
        secure: false,
        changeOrigin: true
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime']
          }
        }
      }
    ]
  },

  plugins: [
    // 使用此插件来支持热重载
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpack({
      template: path.resolve(__dirname, './src/index.html'),
      title: "测试一下JS",
      filename: 'step3.html'
    }),
    new CleanWebpackPlugin(['dist']),
    extractSass
  ]
}
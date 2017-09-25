const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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

  plugins: [
    new HtmlWebpack({
      template: path.resolve(__dirname, './src/index.html'),
      title: "测试一下",
      filename: 'step1.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}
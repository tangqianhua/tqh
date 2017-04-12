var webpack = require('webpack');
var path = require('path');
module.exports = {
  context: __dirname+"/src",
  entry: "./js/root.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  output: {
    path: __dirname + "/src/",
    publicPath:"/src/",   //命令行模式下,一定要配置output.publicPath来指定编译后的包(bundle)的访问位置.
    filename: "bundle.js"
  },
};

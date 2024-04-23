const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkhash].css',
      chunkFilename: 'bundle.[chunkhash].css'
    })
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    open: true
  }
});

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
    open: true,
    proxy: {
      '/api': {
        target: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        pathRewrite: {'^/api' : ''}, // In this case we don't pass `api` path
        secure: false,
        changeOrigin: true
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    }
  }
});

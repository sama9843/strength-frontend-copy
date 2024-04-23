const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name].[chunkhash].css',
      chunkFilename: 'static/[name].[chunkhash].css'
    })
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ]
  }
});

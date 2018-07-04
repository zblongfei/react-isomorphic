const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const merge = require('webpack-merge')

const config = require('./webpack.conf')

module.exports = merge(config, {
  entry: {
    main: [
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      './src/client.tsx'
    ]
  },

  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
})

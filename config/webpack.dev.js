const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      './src/client.tsx'
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
})

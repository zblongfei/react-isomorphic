const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/client.tsx',

  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },

  devtool: 'source-map',

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: ['url-loader?limit=1000&name=images/[hash].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader?name=fonts/[hash].[ext]']
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      }
    }),
    new ManifestPlugin({ fileName: '../manifest.json' }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css')
  ]
}

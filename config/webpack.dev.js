const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    main: [
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      './src/client.tsx'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },

  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
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
    new webpack.HotModuleReplacementPlugin()
  ]
}

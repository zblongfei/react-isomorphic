const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: './src/client.tsx',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              /* Loader options go here */
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: ['node_modules'],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: ['url-loader?limit=1000&name=images/[hash].[ext]'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader?name=fonts/[hash].[ext]'],
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js',
          },
        },
      },
    }),
    new ManifestPlugin({ fileName: '../manifest.json' }),
  ],
}

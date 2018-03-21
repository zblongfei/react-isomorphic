const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: './src/client.tsx',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/'
  },

  mode: 'development',

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [new ManifestPlugin({ fileName: '../manifest.json' })]
}

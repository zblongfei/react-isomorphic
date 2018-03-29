const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const getExternals = () => {
  return fs
    .readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`
      return externals
    }, {})
}

module.exports = {
  entry: {
    server: './server/server.ts'
  },

  output: {
    filename: '../[name].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },

  externals: getExternals(),

  mode: 'production',

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
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
        },
        sass: {
          sourceMap: true
        }
      }
    })
  ],

  // 不启用压缩
  optimization: {
    minimize: false
  }
}

const copyFile = (source, target) => {
  fs.writeFileSync(target, fs.readFileSync(source))
}

// copy favicon.ico
copyFile('./public/favicon.ico', './dist/favicon.ico')

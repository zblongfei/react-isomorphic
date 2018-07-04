if (process.env.NODE_ENV === 'development') {
  // css hook
  require('css-modules-require-hook')({
    extensions: ['.css', '.scss'],
    generateScopedName: '',
  })
}

import * as express from 'express'
import * as path from 'path'

import mock from './mock'
import render from './render'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

// favicon.ico
const faviconPath = `${isProduction ? '../dist' : '../public'}/favicon.ico`
app.use(require('serve-favicon')(path.resolve(__dirname, faviconPath)))

// static
app.use(express.static(path.resolve(__dirname, '../dist/public')))

// mock data
mock(app)

if (!isProduction) {
  const config = require('../config/webpack.dev')
  const compiler = require('webpack')(config)

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: config.output.publicPath,
  })

  // on development env
  const getManifest = (devMiddleware: any) => {
    const content = devMiddleware.fileSystem.readFileSync(
      path.resolve(__dirname, '../dist/manifest.json'),
    )
    return JSON.parse(content)
  }

  app.use(webpackDevMiddleware)
  app.use(require('webpack-hot-middleware')(compiler))
  app.use('*', (req, res) => {
    return render(req, res, getManifest(webpackDevMiddleware))
  })
} else {
  app.use('*', (res, rep) => {
    return render(res, rep, require('../dist/manifest.json'))
  })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}\n`)
})

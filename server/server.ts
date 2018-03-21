import * as express from 'express'

import mock from './mock'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

mock(app)

app.use(require('connect-history-api-fallback')())

if (!isProduction) {
  const config = require('../config/webpack.dev')
  const compiler = require('webpack')(config)

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
    publicPath: config.output.publicPath
  })

  app.use(webpackDevMiddleware)
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(require('connect-history-api-fallback')())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}\n`)
})

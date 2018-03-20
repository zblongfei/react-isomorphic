import * as express from 'express'

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}\n`)
})

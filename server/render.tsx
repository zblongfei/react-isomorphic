import * as express from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../src/containers/App'
import routes from '../src/routes'

const render = (req: express.Request, res: express.Response) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.baseUrl} context={{}}>
      <App />
    </StaticRouter>
  )
  return res.status(200).send(`<!DOCTYPE html> ${html}`)
}

export default render

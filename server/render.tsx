import * as express from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from '../src/containers/App'
import routes from '../src/routes'
import configureStore from '../src/store'

// manifest.json styles
const styles = ['common.css', 'main.css']
// manifest.json scripts
const scripts = ['runtime.js', 'common.js', 'main.js']

interface HtmlProps {
  initState: Object
  manifest: { [key in string]: string }
}

class Html extends React.Component<HtmlProps> {
  safeJSONstringify = (obj: Object) => {
    return JSON.stringify(obj)
      .replace(/<\/script/g, '<\\/script')
      .replace(/<!--/g, '<\\!--')
  }

  resolve = (files: string[]) => {
    const { manifest } = this.props
    return files
      .map(src => (!!manifest[src] ? manifest[src] : null))
      .filter(file => !!file)
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>React App</title>
          {/* init styles*/}
          {this.resolve(styles).map(src => (
            <link rel="stylesheet" key={src} href={src} />
          ))}
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="app">{this.props.children}</div>
          {/* init state */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__=${this.safeJSONstringify(
                this.props.initState
              )}`
            }}
          />
          {/* init scripts */}
          {this.resolve(scripts).map(src => <script key={src} src={src} />)}
        </body>
      </html>
    )
  }
}

const render = (req: express.Request, res: express.Response, manifest: any) => {
  // get init state
  const store = configureStore()
  const promises: Promise<any>[] = []
  routes.some(route => {
    const match = matchPath(req.baseUrl, route)
    if (match && route.loadData) {
      promises.push(route.loadData(store))
    }
    return !!match
  })

  return Promise.all(promises).then(() => {
    const html = ReactDOMServer.renderToString(
      <Html manifest={manifest} initState={store.getState()}>
        <Provider store={store}>
          <StaticRouter location={req.baseUrl} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      </Html>
    )
    return res.status(200).send(`<!DOCTYPE html> ${html}`)
  })
}

export default render

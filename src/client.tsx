import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import configureStore from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

const state = window.__INITIAL_STATE__ || {}

ReactDOM.render(
  <Provider store={configureStore(state)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
)

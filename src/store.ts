import { applyMiddleware, compose, createStore, Middleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { isClient } from './common/js/utils'
import reducers from './redux/reducers'

const middlewares: Middleware[] = [thunk]

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development' && isClient()) {
  middlewares.push(logger)

  // redux devtools compose
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const configureStore = (initState: object = {}) => {
  return createStore(
    reducers,
    initState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}

export default configureStore

import { createStore, compose, applyMiddleware, Middleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducers from './redux/reducers'
import { isClient } from './common/js/utils'

const middlewares: Middleware[] = [thunk]

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development' && isClient()) {
  middlewares.push(logger)

  // redux devtools compose
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const configureStore = (initState: Object = {}) => {
  return createStore(
    reducers,
    initState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}

export default configureStore

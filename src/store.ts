import { createStore, compose, applyMiddleware, Middleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducers from './redux/reducers'
import { isClient } from './common/js/utils'

const middlewares: Middleware[] = [thunk]

if (process.env.NODE_ENV === 'development' && isClient()) {
  middlewares.push(logger)
}

const configureStore = (initState: Object = {}) => {
  return createStore(
    reducers,
    initState,
    compose(applyMiddleware(...middlewares))
  )
}

export default configureStore

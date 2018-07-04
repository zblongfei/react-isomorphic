import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Header } from '../../components'
import About from '../About'
import Home from '../Home'
import Todo from '../Todo'

import './style.scss'

const App = () => {
  return (
    <section className="AppContainer">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" expect component={About} />
        <Route path="/todo" expect component={Todo} />
      </Switch>
    </section>
  )
}

export default App

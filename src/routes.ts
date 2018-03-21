import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import Todo from './containers/Todo'

const routes = [
  { path: '/', component: App, exact: true },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/todo', component: Todo }
]

export default routes

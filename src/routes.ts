import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'
import Todo, { loadData } from './containers/Todo'

const routes = [
  { path: '/', component: App, exact: true },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/todo', component: Todo, loadData }
]

export default routes

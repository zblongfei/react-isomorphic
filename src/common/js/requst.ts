import axios from 'axios'
import { isClient } from './utils'

let baseURL = 'http://127.0.0.1:3000'
if (isClient()) {
  baseURL = window.location.origin
}

const requst = axios.create({
  baseURL,
  timeout: 30000
})

export default requst

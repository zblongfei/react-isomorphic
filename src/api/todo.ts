import axios, { AxiosPromise } from 'axios'
import { HttpResponse } from '../common/models/response'
import { ITodo } from '../common/models/todo'

export function getTodos(): Promise<HttpResponse<ITodo[]>> {
  return axios.get('http://localhost:3000/api/todos').then(res => res.data)
}

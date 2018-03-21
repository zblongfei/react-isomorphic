import { HttpResponse } from '../common/models/response'
import { ITodo } from '../common/models/todo'
import requst from '../common/js/requst'

export function getTodos(): Promise<HttpResponse<ITodo[]>> {
  return requst.get('/api/todos').then(res => res.data)
}

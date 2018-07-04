import requst from '../common/js/requst'
import { IHttpResponse } from '../common/models/response'
import { ITodo } from '../common/models/todo'

export function getTodos(): Promise<IHttpResponse<ITodo[]>> {
  return requst.get('/api/todos').then((res) => res.data)
}

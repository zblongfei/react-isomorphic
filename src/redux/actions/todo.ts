import { Dispatch } from 'react-redux'
import { createAction } from 'redux-actions'

import api from '../../api'
import { ITodo } from '../../common/models/todo'

export const ADD_TODO = 'ADD_TODO'

export const TOGGLE_TODO = 'TOGGLE_TODO'

export const DELETE_TODO = 'DELETE_TODO'

export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST'

export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'

export const GET_TODOS_FAILED = 'GET_TODOS_FAILED'

export const addTodo = createAction(ADD_TODO, (todo: ITodo) => ({ todo }))

export const toggleTodo = createAction(TOGGLE_TODO, (id: number) => ({ id }))

export const deleteTodo = createAction(DELETE_TODO, (id: number) => ({ id }))

export const getTodosRequest = createAction(GET_TODOS_REQUEST)

export const getTodosSuccess = createAction(
  GET_TODOS_SUCCESS,
  (todos: ITodo[]) => ({ todos }),
)

export const getTodosFailed = createAction(
  GET_TODOS_FAILED,
  (error: Error) => ({ error }),
)

export const getTodos = () => {
  return async (dispatch: Dispatch<{}>) => {
    dispatch(getTodosRequest())
    try {
      const { code, data } = await api.getTodos()
      if (code === 200) {
        dispatch(getTodosSuccess(data))
      } else {
        dispatch(getTodosSuccess([]))
      }
    } catch (e) {
      dispatch(getTodosFailed(e))
    }
  }
}

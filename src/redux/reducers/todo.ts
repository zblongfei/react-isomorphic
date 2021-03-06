import produce from 'immer'
import { handleActions } from 'redux-actions'

import { ITodo } from '../../common/models/todo'
import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS_FAILED,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  TOGGLE_TODO,
} from '../actions/todo'

export interface ITodoStore {
  isFetching: boolean
  todos: ITodo[]
  error: Error | null
}

export interface ITodoParam {
  todo: ITodo
  todos: ITodo[]
  id: number
  error: Error | null
}

const initialState: ITodoStore = {
  error: null,
  isFetching: false,
  todos: [],
}

export default handleActions<ITodoStore, ITodoParam>(
  {
    [ADD_TODO](state, action) {
      return produce(state, (draft) => {
        draft.todos.push(action.payload.todo)
      })
    },

    [TOGGLE_TODO](state, action) {
      return produce(state, (draft) => {
        const { todos } = draft
        const index = todos.findIndex((todo) => todo.id === action.payload.id)
        todos[index].isDone = !todos[index].isDone
      })
    },

    [DELETE_TODO](state, action) {
      return produce(state, (draft) => {
        const index = draft.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        )
        draft.todos.splice(index, 1)
      })
    },

    [GET_TODOS_REQUEST](state, action) {
      return produce(state, (draft) => {
        draft.isFetching = true
      })
    },

    [GET_TODOS_SUCCESS](state, action) {
      return produce(state, (draft) => {
        draft.isFetching = false
        draft.todos = action.payload.todos
      })
    },

    [GET_TODOS_FAILED](state, action) {
      return produce(state, (draft) => {
        draft.isFetching = false
        draft.error = action.payload.error
      })
    },
  },
  initialState,
)

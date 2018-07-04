import * as React from 'react'
import { connect, Dispatch, Store } from 'react-redux'

import { ITodo } from '../../common/models/todo'
import { addTodo, getTodos } from '../../redux/actions/todo'
import { ITodoStore } from '../../redux/reducers/todo'
import TodoList from './TodoList'

import './style.scss'

export interface ITodoProps {
  dispatch: Dispatch<{}>
  isFetching: boolean
  todos: ITodo[]
  error: Error | null
}

export interface ITodoState {
  value: string
  id: number
}

class Todo extends React.Component<ITodoProps, ITodoState> {
  constructor(props: ITodoProps) {
    super(props)
    this.state = {
      id: 0,
      value: '',
    }
  }

  public componentDidMount() {
    const { todos, dispatch } = this.props
    if (todos.length === 0) {
      dispatch(getTodos())
    }
  }

  public componentWillReceiveProps(nextProps: ITodoProps) {
    if (nextProps.todos.length > 0) {
      this.setState({
        id: Math.max(...nextProps.todos.map((todo) => todo.id)) + 1,
      })
    }
  }

  public handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    })
  }

  public handleOnInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const { value, id } = this.state
      if (value) {
        this.props.dispatch(
          addTodo({
            id,
            isDone: false,
            value,
          }),
        )
        this.setState({ value: '', id: id + 1 })
      }
    }
  }

  public render() {
    return (
      <>
        <div>
          <h2>Todos</h2>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="add todo"
          value={this.state.value}
          onChange={this.handleOnInputChange}
          onKeyUp={this.handleOnInputKeyUp}
        />
        <TodoList todos={this.props.todos} />
      </>
    )
  }
}

// ssr load data
export const loadData = (store: Store<{}>) => {
  return store.dispatch(getTodos())
}

const mapStateToProps = (state: { todo: ITodoStore }) => ({ ...state.todo })

export default connect(mapStateToProps)(Todo)

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ITodo } from '../../common/models/todo'
import { toggleTodo, deleteTodo } from '../../redux/actions/todo'

export interface ITodoListProps {
  dispatch: Dispatch<{}>
  todos: ITodo[]
}

class TodoList extends React.Component<ITodoListProps> {
  toggleTodo = (event: React.MouseEvent<HTMLLIElement>) => {
    const $todoItem = event.target as HTMLLIElement
    if ($todoItem && $todoItem.matches('li')) {
      const id = $todoItem.dataset.id
      if (id) {
        this.props.dispatch(toggleTodo(parseInt(id)))
      }
    }
  }

  deleteTodo = (todo: ITodo) => {
    this.props.dispatch(deleteTodo(todo.id))
  }

  render() {
    return (
      <ul className="list-group">
        {this.props.todos.map(todo => (
          <li
            key={todo.id}
            data-id={todo.id}
            className={`list-group-item ${todo.isDone ? 'done' : ''}`}
            onClick={this.toggleTodo}
          >
            {todo.value}
          </li>
        ))}
      </ul>
    )
  }
}

export default connect()(TodoList)

import * as React from 'react'
import { Link } from 'react-router-dom'

const style = require('./style.scss')

export const Header = () => {
  return (
    <>
      <ul className={style.Nav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/todo">todo</Link>
        </li>
      </ul>
    </>
  )
}

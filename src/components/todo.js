import React from 'react'

const Todo = ({ onClick, completed, job, title }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {title}
  </li>
)

export default Todo

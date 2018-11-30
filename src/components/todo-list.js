import React from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

const TodoList = ({ jobs, onTodoClick }) => (
  <ul>
    {jobs.map((job, index) => (
      <Todo key={index} {...job} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
)

TodoList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList

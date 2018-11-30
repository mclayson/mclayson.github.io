import React from 'react'
import FilterTodo from './filter-todo'
import AddTodo from '../containers/add-todo'
import TodoListContainer from '../containers/todo-list-container'

const PageTodo = () => (
  <section id="page-todo">
    <div className="card">
      <AddTodo />
      <TodoListContainer />
      <FilterTodo />
    </div>
  </section>
)

export default PageTodo

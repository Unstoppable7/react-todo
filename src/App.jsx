import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import { useState, useEffect } from 'react'

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList])

  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  )
}

export default App

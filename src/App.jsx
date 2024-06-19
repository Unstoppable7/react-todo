import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [

  {
    id: 1,
    title: "Complete Hawk assignment"
  },
  {
    id: 2,
    title: "Complete Horse assignment"
  },
  {
    id: 3,
    title: "Study English"
  },
  {
    id: 4,
    title: "Check university tasks"
  },

];

function App() {

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {
          todoList.map(
            (item) => <li key={item.id}>{item.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default App

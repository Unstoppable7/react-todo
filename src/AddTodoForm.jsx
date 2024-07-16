import { useState } from 'react';

export default function AddTodoForm({ onAddTodo }) {

  const [todoTitle, setTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  }

  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">
        Title
      </label>
      <input name="title" id="todoTitle" value={todoTitle} onChange={handleTitleChange} />
      <button>Add</button>
    </form>
  );
}
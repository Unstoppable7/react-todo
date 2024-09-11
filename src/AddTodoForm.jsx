import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from './TodoForm.module.css'

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
    <form className={styles.form} onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>Title: </InputWithLabel>
      <button className={styles.button}>Add</button>
    </form>
  );
}

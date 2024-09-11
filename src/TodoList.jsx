import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css'

export default function TodoList({ todoList, onRemoveTodo}) {

  return (
    <ul className={styles.content}>
      {
        todoList.map(
          (item) => <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
        )
      }
    </ul>
  );
}

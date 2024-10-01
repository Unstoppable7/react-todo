import TodoListItem from "./TodoListItem";
import styles from './TodoList.module.css'
import PropTypes from 'prop-types';

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

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func
}

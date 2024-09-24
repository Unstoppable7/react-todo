import styles from './TodoListItem.module.css'
import PropTypes from 'prop-types';

export default function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <div className={styles.rowItem}>
      <li className={styles.listItem}>{todo.title}</li>
      <button className={styles.removeButton} type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </div>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func
}
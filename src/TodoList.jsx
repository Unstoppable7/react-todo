import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList, onRemoveTodo}) {

  return (
    <ul>
      {
        todoList.map(
          (item) => <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
        )
      }
    </ul>
  );
}

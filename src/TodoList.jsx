import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList }) {

  return (
    <ul>
      {
        todoList.map(
          (item) => <TodoListItem key={item.id} todo={item} />
        )
      }
    </ul>
  );
}

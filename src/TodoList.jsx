import TodoListItem from "./TodoListItem";

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

export default function TodoList() {

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

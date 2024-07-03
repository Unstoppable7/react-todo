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
          (item) => <li key={item.id}>{item.title}</li>
        )
      }
    </ul>
  );
}

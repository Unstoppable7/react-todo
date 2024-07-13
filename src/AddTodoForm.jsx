export default function AddTodoForm(props) {

  function handleAddTodo(event){
    event.preventDefault();
    const todoTitle = event.target.querySelector("input").value;

    console.log(`todoTitle: ${todoTitle}`);

    event.target.reset();

    props.onAddTodo(todoTitle);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">
        Title
      </label>
      <input name="title" id="todoTitle"/>
      <button>Add</button>
    </form>
  );
}
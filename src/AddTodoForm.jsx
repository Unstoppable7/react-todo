export default function AddTodoForm() {

  return (
    <form>
      <label htmlFor="todoTitle">
        Title
      </label>
      <input id="todoTitle" />
      <button>Add</button>
    </form>
  );
}
// import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles.module.css";

function App() {

   const [todoList, setTodoList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

   const [sort, setSort] = useState({ field: 'title', asc: true });

   const sortData = (objA, objB) => {
      const fieldA = objA[sort.field];
      const fieldB = objB[sort.field];

      if (!fieldA || !fieldB) {
         return;
      }
      if (fieldA < fieldB) {
         return sort.asc ? -1 : 1;
      } else if (fieldA == fieldB) {
         return 0;
      } else {
         return sort.asc ? 1 : -1;
      }
   }
   useEffect(() => {
      setTodoList((previousTodoList) => {
         const sortedList = [...previousTodoList].sort(sortData);
         return sortedList;
      });
   }, [sort]);

   const getTodoList = async () => {

      const options = {
         method: 'GET',
         headers: { 'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` }
      };

      try {

         const response = await fetch(baseUrl, options);
         // const response = await fetch(baseUrl + "?sort%5B0%5D%5Bfield%5D=title", options);

         if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
         }

         const data = await response.json();

         const todos = data.records.map((todo) => {
            return {
               id: todo.id,
               title: todo.fields.title,
               createdTime: todo.createdTime
            }
         }).sort(sortData);
         setTodoList(todos);
         setIsLoading(false);

      } catch (error) {
         console.log(error.message)
      }
   }

   const postTodo = async (todo) => {
      const originalItems = [...todoList];

      const newTodo = {
         "fields": {
            "title": todo.title
         }
      }

      const options = {
         method: 'POST',
         headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newTodo),
      };

      //Add to local items
      addTodo(todo)

      try {
         const response = await fetch(baseUrl, options);

         if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
         }
         const dataResponse = await response.json();

         setTodoList((previousTodoList) =>
            previousTodoList.map((item) =>
               item.id === todo.id ? { ...item, id: dataResponse.id } : item
            )
         );

      } catch (error) {
         setTodoList(originalItems);
         console.log(error.message)
      }

   }

   const deleteTodo = async (id) => {
      const url = `${baseUrl}/${id}`;
      const originalItems = [...todoList];

      const options = {
         method: 'DELETE',
         headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
         }
      };

      //Remove local item
      removeTodo(id);

      try {
         const response = await fetch(url, options);

         if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
         }

      } catch (error) {
         setTodoList(originalItems);
         console.log(error.message)
      }
   }

   useEffect(() => {
      getTodoList();
   }, [])

   useEffect(() => {
      if (!isLoading) {
         localStorage.setItem("savedTodoList", JSON.stringify(todoList));
      }
   }, [todoList]);

   function removeTodo(id) {
      const newTodoList = todoList.filter((item) => item.id != id);
      setTodoList(newTodoList);
   }

   function addTodo(newTodo) {
      setTodoList((previousTodoList) => {
         const newList = [...previousTodoList, newTodo].sort(sortData);
         return newList;
      });
   }

   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/"
               element={
                  <div className={`${styles.container} ${styles.body}`}>
                     <h1>Todo List</h1>
                     <section>
                        <AddTodoForm onAddTodo={postTodo} />
                        <button onClick={() => {
                           setSort(previousSort => ({
                              field: 'title',
                              asc: !previousSort.asc
                           }));
                        }}>
                           {sort.field  === 'title'? sort.asc ? '⬆ ' : '⬇ ' : ''}Title
                        </button>

                        <button onClick={() => {
                           setSort(previousSort => ({ field: 'createdTime', asc: !previousSort.asc }));
                        }}>
                           { sort.field  === 'createdTime'? sort.asc ? '⬆ ' : '⬇ ' : ''}Created Time
                        </button>
                        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={deleteTodo} />}
                     </section>
                  </div>
               } >
            </Route>
            <Route
               path="/new"
               element={
                  <h1>New Todo List</h1>
               }>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;

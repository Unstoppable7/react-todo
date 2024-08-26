import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

   const [todoList, setTodoList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

   const getTodoList = async () => {

      const options = {
         method: 'GET',
         headers: { 'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` }
      };

      try {

         const response = await fetch(baseUrl, options);

         if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
         }

         const data = await response.json();

         const todos = data.records.map((todo) => {
            return {
               id: todo.id,
               title: todo.fields.title
            }
         });
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
      setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
   }

   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <h1>Todo List</h1>
                     <AddTodoForm onAddTodo={postTodo} />
                     {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={deleteTodo} />}
                  </>
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

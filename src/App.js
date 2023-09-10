
import './App.css';
import Header from "./MyComponents/Header";//imported defalut export
import { Todos } from "./MyComponents/Todos";//imported named export not default
import { Footer } from "./MyComponents/Footer";//imported named export
import { AddTodo } from "./MyComponents/AddTodo";
import React, { useState, useEffect } from 'react';
// import { About } from "./MyComponents/About"; 
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am on onDelete of todo", todo);
    // Deleting this way in React does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo = (title, desc) => {
    console.log("Adding a todo ", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo])
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])



  return (
    // Must include the tags to wrap the content as the function is returning something 
    <>
      {/* <BrowserRouter> */}
        <Header title="My Todo List" searchBar={true} /> {/* On removing the title the default value of title will be executed */}

        {/* <Routes>
          <Route exact path="/" element={
            <React.Fragment> */}
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            {/* </React.Fragment>
          } /> */}
         {/* <Route exact path="/about" element={<About />} />
        </Routes> */}
        <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;


/* Some important notes while using the React
   1. For writting the code in JSX we need to change the language selected from Javascript(default) to JavaScript JSX
   2. All the HTML "class* is to be changed by "className" and "for" to "htmlFor"
   3. The written codes uses the React-router-dom of version 5 and the latest version is 6 so some changes are made like:
    . While rendering the path we must use the "Routes" instead of "Switch" and for rendering multiple components we need to provide the path iside the "React.Fragment"
   4.For passing the link iside our app we need to change some keywords:
     . In HTML we use href to pass the link replace "href" with "to"
     . The anchor tag "a" with "Link"  
    */

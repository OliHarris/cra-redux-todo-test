import React, { useState, useEffect, useReducer } from 'react';

import './App.scss';
import './App2.scss';

function Initialise() {
  //set up dummy test data
  const [todoList] = useState([
    // { id: 1, name: "EEE", status: true},
    // { id: 2, name: "FFF", status: false},
    // { id: 3, name: "GGG", status: true},
    // { id: 4, name: "HHHHHHHHHHHHHHHHHHHHHHHH", status: false}
  ]);

  //set up todo value logic 
  const [todoVal, setTodoVal] = useState("");
  useEffect(() => {
    console.log(`todo Value: ${todoVal}`);
  }, [todoVal]);

  //reducer logic
  const reducer = (todoList, action) => {
    //if updateTodoVal function
    if(action.type === 'update') {
      console.log("UPDATE");
      //copy todoList array (no mutate original array)
      const newArray = todoList.slice();
      //update relevant array status
      newArray.map((todo, index) => {
        if (todo.id === action.payload) {
          todo.status ? newArray[index].status = false : newArray[index].status = true;
        }
        return true;
      });
      console.log(newArray);
      return newArray;
    }
    //if addTodoVal function
    if(action.type === 'add') {
      console.log("ADD");
      //push to todoList array only if todoVal
      if (action.payload !== "") {
        //find last id in array
        let lastId = 0;
        if (todoList.length) {
          lastId = todoList[todoList.length - 1].id;
        }
        todoList.push(
          { id: lastId + 1, name: action.payload, status: false}
        );
        setTodoVal("");
      };
      console.log(todoList);
      return todoList;
    }
    //if removeTodoVal function
    if(action.type === 'remove') {
      console.log("REMOVE");
      //remove from todoList array - filter better than splice (no mutate original array)
      let filteredArray = todoList.filter(todo => todo.id !== action.payload);
      console.log(filteredArray);
      return filteredArray;          
    }
  }  
  const [todoListState, dispatch] = useReducer(reducer, todoList);
  function updateTodoVal(todoId) {
    //parsed in todo.id
    dispatch({ type: 'update', payload: todoId });
  }
  function addTodoVal(newTodoVal) {
    //parsed in todoVal
    dispatch({ type: 'add', payload: newTodoVal });
  }
  function removeTodoVal(todoId) {
    //parsed in todo.id
    dispatch({ type: 'remove', payload: todoId });
  }  

  //render checkbox logic
  function Checkbox({ id, status }) {
    const [checked, setChecked] = useState(status);
    return (
      <>
        <label htmlFor="checkbox"
          onClick={() => {
            updateTodoVal(id);
            //whatever the value of checked is return opposite
            setChecked(checked => !checked);
          }}>          
          <strong>Done?</strong>
          <input type="checkbox" readOnly
            checked={checked}
          />
          <span className={checked ? "checked" : ""}></span>
        </label>
      </>
    )
  }

  //render main logic
  return (
    <>
      <section className="row">
        <div id="header" className="col-12">
          <h1>Todo App</h1>
          <div className="center">
            <input type="textbox"
              value={todoVal}
              //collect value when user types in
              onChange={e => setTodoVal(e.target.value)}
              placeholder="Enter todo"
            />
            <button className="rounded" onClick={() => addTodoVal(todoVal)}>
              Add
            </button>
          </div>
          <hr />
        </div>

        <div id="todo-items" className="col-12">
          <ul className="no-disc">
            {/* loop through each object in todoList array */}
            {todoListState.map((todo, idx) => (
              <li key={idx} className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6 col-md-3 columns">
                      <Checkbox id={todo.id} status={todo.status} />
                    </div>
                    <div className="col-12 col-md-6 columns hide-small show-large">
                      <h2 className="center">"{todo.name}"</h2>
                    </div>
                    <div className="col-6 col-md-3 columns">
                      <div className="cf">
                        <button className="right rounded" onClick={() => removeTodoVal(todo.id)}>
                          &#128465;
                        </button>
                      </div>
                    </div>
                    <div className="col-12 hide-large">
                      <h2 className="center">"{todo.name}"</h2>
                    </div>                    
                  </div>
                  <hr />
                </div>
              </li>           
            ))}
          </ul>
        </div>
      </section>        
    </>
  )
}

function App() {
  return (
    <Initialise />
  );
}

export default App;

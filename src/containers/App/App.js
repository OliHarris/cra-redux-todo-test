import React, { useState, useEffect, useReducer } from 'react';

import './todo-fonts.scss';
import './todo-base.scss';
import './todo-styles.scss';

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
    if (action.type === 'update') {
      console.log("UPDATE");
      //copy todoList array to return new array (no mutate original array)
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
    if (action.type === 'add') {
      console.log("ADD");
      //copy todoList array to return new array (no mutate original array)
      const newArray = todoList.slice();
      //push to todoList array only if todoVal
      if (action.payload !== "") {
        //find last id in array
        let lastId = 0;
        if (newArray.length) {
          lastId = newArray[newArray.length - 1].id;
        }
        newArray.push(
          { id: lastId + 1, name: action.payload, status: false}
        );
        setTodoVal("");
      };
      console.log(newArray);
      return newArray;
    }
    //if removeTodoVal function
    if (action.type === 'remove') {
      console.log("REMOVE");
      //filter todoList array to return new array; do not use splice (no mutate original array)
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
        <label htmlFor="checkbox" className="rounded"
          onClick={() => {
            updateTodoVal(id);
            //whatever the value of checked is return opposite
            setChecked(checked => !checked);
          }}>          
          Done?
          <input type="checkbox" readOnly />
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
          <hr />
          <div className="center">
            <input type="textbox"
              value={todoVal}
              //collect value when user types in
              onChange={e => setTodoVal(e.target.value)}
              placeholder="Enter todo"
            />
            <button className="rounded"
              onClick={() => addTodoVal(todoVal)}
              disabled={todoVal === ""}>
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
                    <div className="col-7 col-md-3">
                      <Checkbox id={todo.id} status={todo.status} />
                    </div>
                    <div className="col-12 col-md-6 hide-small show-large">
                      <h2 className="center">"{todo.name}"</h2>
                    </div>
                    <div className="col-5 col-md-3">
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

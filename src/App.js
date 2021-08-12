import React from "react";
import ToDo from "./ToDo";
import ToDoPractice from "./ToDo Practice";
function App() {
  return (
    <div className="container">
      <header className="App-header">
      <h1>To Do List Application</h1>
       
        <ToDo/>
        {/* <ToDoPractice/> */}
      </header>
    </div>
  );
}

export default App;

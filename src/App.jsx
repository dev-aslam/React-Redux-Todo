import { Todos } from "./components/Todos";
import { AddTodo } from "./components/AddTodo";
import "./App.css";

function App() {
  return (
    <>
      <h1>Todo App</h1>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;

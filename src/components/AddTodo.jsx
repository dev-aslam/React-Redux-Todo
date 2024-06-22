import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, clearError } from "../features/todo/todoSlice";
import { useSelector } from "react-redux";

export const AddTodo = () => {
  const errorD = useSelector((state) => state.error);

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim() != "") {
      dispatch(addTodo(input));
      setError("");
    } else {
      setError("Input should not be empty");
    }
    setInput("");
  };

  return (
    <div>
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Todo..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
            if (errorD) dispatch(clearError());
          }}
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Add Todo
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {errorD && <p className="text-red-500">{errorD}</p>}
    </div>
  );
};

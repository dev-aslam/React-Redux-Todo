import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  updateTodo,
  isCompleted,
} from "../features/todo/todoSlice";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState({});
  const [editText, setEditText] = useState({});

  const removeTodoHandler = (id) => {
    dispatch(removeTodo(id));
  };

  const toggleEditing = (id, text) => {
    if (!editing[id]) {
      setEditing((cur) => ({ ...cur, [id]: !cur[id] }));
      setEditText((cur) => ({ ...cur, [id]: text }));
    } else {
      dispatch(updateTodo({ id, text: editText[id] }));
      setEditing((cur) => ({ ...cur, [id]: !cur[id] }));
    }
  };

  const textHandleOnChange = (id, text) => {
    setEditText((cur) => ({ ...cur, [id]: text }));
  };

  const checkHandleChange = (id) => {
    dispatch(isCompleted(id));
  };

  return (
    <>
      <div className="w-full">
        {todos.map((todo) => (
          <div
            className="py-2 my-5 px-3 bg-gray-800 rounded border border-gray-700 text-gray-300 text-left flex justify-between items-center"
            key={todo.id}>
            <div className="flex items-center">
              <Checkbox
                size="small"
                onChange={() => checkHandleChange(todo.id)}
                checked={todo.completed}
              />
              {!editing[todo.id] ? (
                <div className={todo.completed ? "line-through" : ""}>
                  {todo.text}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    className="bg-gray-800 rounded border-none text-base outline-none text-gray-50 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter Todo..."
                    value={editText[todo.id]}
                    onChange={(e) =>
                      textHandleOnChange(todo.id, e.target.value)
                    }
                  />
                </>
              )}
            </div>
            <div className="flex gap-1">
              {!editing[todo.id] ? (
                <button
                  className="flex cursor-pointer hover:text-yellow-500 focus:outline-none p-2 justify-center items-center"
                  onClick={() => toggleEditing(todo.id, todo.text)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pen"
                    viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="flex cursor-pointer hover:text-yellow-500 focus:outline-none p-2 justify-center items-center"
                  onClick={() => toggleEditing(todo.id, todo.text)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-floppy"
                    viewBox="0 0 16 16">
                    <path d="M11 2H9v3h2z" />
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                  </svg>
                </button>
              )}
              <button
                className="flex cursor-pointer hover:text-red-500 focus:outline-none p-2 justify-center items-center"
                onClick={() => removeTodoHandler(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

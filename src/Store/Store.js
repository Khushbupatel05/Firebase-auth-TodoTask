
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Features/todos/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;

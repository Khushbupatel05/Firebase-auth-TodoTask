
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../newfeature/todos/todoSlice";


const store = configureStore({
  reducer: {
    todos: reducer,
  },
});

export default store;

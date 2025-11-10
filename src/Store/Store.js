import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../../../Firebase-todolist/src/features/todos/todoSlice";


export const store = configureStore({
    reducer: {
        todos: todoReducer,
    }
})
import { configureStore } from "@reduxjs/toolkit";
import  todosReducer  from "./todosSlice";

export const Store = configureStore({
    reducer: {
        todos: todosReducer,
    }
    
})


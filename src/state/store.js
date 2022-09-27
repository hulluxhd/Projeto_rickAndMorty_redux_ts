import { configureStore } from "@reduxjs/toolkit";
import  charactersReducer  from "./characters/characters.slice";
import  userReducer  from "./user/user.slice";

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        user: userReducer,
    }
})
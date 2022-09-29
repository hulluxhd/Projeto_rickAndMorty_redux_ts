import { configureStore } from "@reduxjs/toolkit";
import  charactersReducer  from "./characters/characters.slice";
import  userReducer  from "./user/user.slice";

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
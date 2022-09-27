import { createSlice } from '@reduxjs/toolkit'
import { favourite } from '../characters/characters.slice'


export const userReducer = createSlice({
    name: 'user',
    initialState: {
        favourites: [],
    },
    reducers: {
        addToFavourite: (state, action) => {
            state.favourites = action.payload
        }
    }
})

export const favouriteThunk =  (character) => async (dispatch, getState) => {
    const state = getState()

    await dispatch(favourite(character))
    // essa lógica tá ruim. Melhorar
    const fav = state.characters.charactersList.filter(char => char.favourite === true)
    console.log(fav)

    dispatch(addToFavourite(fav))
}


export const favouritesSelector = (state) => state.user.favourites

export const { addToFavourite } = userReducer.actions

export default userReducer.reducer
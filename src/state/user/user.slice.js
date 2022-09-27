import { createSlice, current } from '@reduxjs/toolkit'
import { favourite } from '../characters/characters.slice'


export const userReducer = createSlice({
    name: 'user',
    initialState: {
        favourites: [],
    },
    reducers: {
        addToUserFavourite: (state, action) => {
            state.favourites = [...state.favourites, action.payload]
        },
        removeFavouriteFromUser: (state, action) => { 
            state.favourites = state.favourites.filter(char => char.id !== action.payload.id)
        }
    }
})

export const favouriteThunk =  (character) => (dispatch, getState) => {
    console.log(character)
    dispatch(favourite(character))
    const char = getState().characters.charactersList.find(c => c.id === character.id)
    if (char.favourite) {
        dispatch(addToUserFavourite(char))
    } else {
        dispatch(removeFavouriteFromUser(char))
    }
}


export const favouritesSelector = (state) => state.user.favourites

export const { addToUserFavourite, removeFavouriteFromUser } = userReducer.actions

export default userReducer.reducer
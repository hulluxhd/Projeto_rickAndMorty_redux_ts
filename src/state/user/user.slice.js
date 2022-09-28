import { createSlice, current } from '@reduxjs/toolkit'
import { rickandmortyapi } from '../../services/api'
import { routes } from '../../services/api.routes'
import { favourite } from '../characters/characters.slice'
import detailDefault from "./detailDefault.data"

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        favourites: [],
        detail: detailDefault,
        detailEpisodesArray: []
    },
    reducers: {
        addToUserFavourite: (state, action) => void (state.favourites = [...state.favourites, action.payload]),

        removeFavouriteFromUser: (state, action) => {
            state.favourites = state.favourites
                .filter(char => char.id !== action.payload.id)
        },

        clearFavourites: (state) => void (state.favourites = []),

        setDetailPage: (state, action) => void (state.detail = action.payload),

        setDetailEpisodesArray: (state, action) => {
            state.detailEpisodesArray = [action.payload].flatMap(n => n)
        }
    }
})

export const favouriteThunk = (character) => (dispatch, getState) => {

    dispatch(favourite(character))

    const char = getState().characters.charactersList.find(c => c.id === character.id)

    if (char.favourite) {
        dispatch(addToUserFavourite(char))
    }
    else {
        dispatch(removeFavouriteFromUser(char))
    }
}

export const detailEpisodesThunk = (idsArray) => async (dispatch) => {
    try {
        const { data } = await rickandmortyapi.get(`${routes.EPISODES}/${idsArray}`)
        dispatch(setDetailEpisodesArray(data))
    } catch (e) {
        alert(e)
    }
}


export const detailEpisodesArray = (state) => state.user.detailEpisodesArray
export const favouritesSelector = (state) => state.user.favourites
export const detail = (state) => state.user.detail

export const {
    removeFavouriteFromUser,
    setDetailEpisodesArray,
    addToUserFavourite,
    clearFavourites,
    setDetailPage,
} = userReducer.actions

export default userReducer.reducer
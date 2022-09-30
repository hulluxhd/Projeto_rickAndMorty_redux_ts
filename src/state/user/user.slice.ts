import {  createSlice, PayloadAction} from '@reduxjs/toolkit'
import { rickandmortyapi } from '../../services/api'
import { routes } from '../../services/api.routes'
import { ICharacter } from '../../types/character.type'
import { IEpisode } from '../../types/episode.type'
import { favourite } from '../characters/characters.slice'
import { AppThunkDispatch, RootState } from '../store'
import detailDefault from "./detailDefault.data"


interface userState {
    favourites: ICharacter[];
    detail: ICharacter;
    detailEpisodesArray: IEpisode[];
}

const initialState: userState = {
    favourites: [],
    detail: detailDefault,
    detailEpisodesArray: []
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToUserFavourite: (state, action: PayloadAction<ICharacter>) => void (state.favourites = [...state.favourites, action.payload]),

        removeFavouriteFromUser: (state, action: PayloadAction<ICharacter>) => {
            state.favourites = state.favourites
                .filter(char => char.id !== action.payload.id)
        },

        clearFavourites: (state) => void (state.favourites = []),

        setDetailPage: (state, action: PayloadAction<ICharacter>) => void (state.detail = action.payload),

        setDetailEpisodesArray: (state, action: PayloadAction<IEpisode[]>) => {
            state.detailEpisodesArray = [action.payload].flatMap(n => n)
        }
    }
})
//Dá pra tipar o thunk com ThunkAction ou com ThunkDispatch
//export const favouriteThunk = (character: ICharacter): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) =>
export const favouriteThunk = (character: ICharacter) => (dispatch: AppThunkDispatch, getState: () => RootState) => {

    dispatch(favourite(character))

    const { characters: { charactersList } } = getState()
    
    const char = charactersList?.find(c => c.id === character?.id)
    
    if (char?.favourite) {
        dispatch(addToUserFavourite(char))
    } else if(char?.favourite === false) {
        dispatch(removeFavouriteFromUser(char))
    }  
    
    

}

export const detailEpisodesThunk = (idsArray: string[]) => async (dispatch: AppThunkDispatch) => {
    try {
        const { data } = await rickandmortyapi.get(`${routes.EPISODES}/${idsArray}`)
        dispatch(setDetailEpisodesArray(data))
    } catch (e) {
        alert(e)
    }
}


export const detailEpisodesArray = (state: RootState) => state.user.detailEpisodesArray
export const favouritesSelector = (state: RootState) => state.user.favourites
export const detail = (state: RootState) => state.user.detail

export const {
    removeFavouriteFromUser,
    setDetailEpisodesArray,
    addToUserFavourite,
    clearFavourites,
    setDetailPage,
} = userReducer.actions

export default userReducer.reducer
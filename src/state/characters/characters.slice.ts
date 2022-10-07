import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { rickandmortyapi } from '../../services/api'
import { routes } from '../../services/api.routes'
import { ICharacter } from '../../types/character.type'
import { AppThunkDispatch, RootState } from '../store'
import { sanitizedData } from './characters.util'


interface charactersState {
    charactersList: ICharacter[],
    filteredCharacters: ICharacter[],
    charFilterName: string,
    pageNumber: number
}

const initialState: charactersState = {
    charactersList: [],
    filteredCharacters: [],
    charFilterName: "",
    pageNumber: 1
}

export const charactersReducer = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => void (state.charactersList = action.payload),

        setFilter: (state, action: PayloadAction<string>) => void (state.charFilterName = action.payload),

        setCharacterFilter: (state) => {
            state.filteredCharacters = state.charactersList.filter(char => {
                const { name } = char
                return name.toUpperCase().includes(state.charFilterName.toUpperCase())
            })
        },

        swapPage: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },

        /**
         * Action que muda a propriedade "favourite"
         * @param {[]} state 
         * @param {{type: string, payload: {}}} action 
         */
        favourite: (state, action: PayloadAction<ICharacter>) => {
            const charArray = [...state.charactersList]
            const char = charArray.find(c => c.id === action.payload.id)
            if (char) {
                char.favourite = !char.favourite
            }
                
        },

        cleanFilter: (state) => {
            state.filteredCharacters = []
            state.charFilterName = ''
        }
    }
})

/**
 * Função thunk para fazer o get nos personagens. Utiliza o número de página guardado na store
 * @returns Retorna o json de personagens
 */
export const getCharactersFromAPI = () => {
    return async (dispatch: AppThunkDispatch, getState: () => RootState) => {

        const { characters: { pageNumber } } = getState()

        try {
            const characters = await rickandmortyapi.get(`${routes.CHARACTERS}/?page=${pageNumber}`)
            
            const { data: { results } } = characters
            
            const { user: { favourites: userFavourites } } = getState()

            if (results.length > 0) {
                
                const charactersArray = sanitizedData(results, userFavourites)
                
                dispatch(setCharacters(charactersArray.flatMap(n => n)))

            } else alert(new Error("No characters were found"))

        } catch (e) {
            console.error(e)
            alert(e)
        }
    }
}

export const charactersSelector = (state: RootState) => state.characters.charactersList;
export const filterSelector = (state: RootState) => state.characters.filteredCharacters;
export const filterCharName = (state: RootState) => state.characters.charFilterName;
export const pageSelector = (state: RootState) => state.characters.pageNumber;

export const { swapPage, setCharacters, setCharacterFilter, cleanFilter, setFilter, favourite } = charactersReducer.actions

export default charactersReducer.reducer
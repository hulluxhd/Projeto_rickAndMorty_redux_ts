import { createSlice, current } from '@reduxjs/toolkit'
import { rickandmortyapi } from '../../services/api'
import { routes } from '../../services/api.routes'
import { sanitizedData } from './characters.util'

export const charactersReducer = createSlice({
    name: 'characters',
    initialState: {
        charactersList: [],
        filteredCharacters: [],
        charFilterName: "",
        pageNumber: 1
    },
    reducers: {
        setCharacters: (state, action) => void (state.charactersList = action.payload),

        setFilter: (state, action) => void (state.charFilterName = action.payload),

        setCharacterFilter: (state) => {
            state.filteredCharacters = state.charactersList.filter(char => {
                const { name } = char
                return name.toUpperCase().includes(state.charFilterName.toUpperCase())
            })
        },

        swapPage: (state, action) => { 
            state.pageNumber = action.payload
        },

        /**
         * Action que muda a propriedade "favourite"
         * @param {[]} state 
         * @param {{type: string, payload: {}}} action 
         */
        favourite: (state, action) => {
            const teste = [...state.charactersList]
            const char = teste.find(c => c.id === action.payload.id)
            char.favourite = !char.favourite
        },

        cleanFilter: (state) => {
            state.filteredCharacters = []
            state.charFilterName = ''
        }
    }
})

/**
 * Função thunk para fazer o get nos personagens
 * @param {number} pageNumber Retorna a página a ser chamada na api
 * @returns Retorna o json de personagens
 */
export const getCharactersFromAPI = () => {
    return async (dispatch, getState) => {

        try {
            const characters = await rickandmortyapi.get(`${routes.CHARACTERS}/?page=${getState().characters.pageNumber}`)
            const { data: { results } } = characters
            const userFavourites = getState().user.favourites
            let charactersArray = sanitizedData(results, userFavourites)
            
            dispatch(setCharacters(charactersArray.flatMap(n => n)))
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
}

export const charactersSelector = (state => state.characters.charactersList)
export const filterSelector = (state => state.characters.filteredCharacters)
export const filterCharName = (state => state.characters.charFilterName)
export const pageSelector = (state => state.characters.pageNumber)

export const { swapPage, setCharacters, setCharacterFilter, cleanFilter, setFilter, favourite } = charactersReducer.actions

export default charactersReducer.reducer
import { createSlice, current } from '@reduxjs/toolkit'
import { rickandmortyapi } from '../../services/api'
import { routes } from '../../services/api.routes'

export const charactersReducer = createSlice({
    name: 'characters',
    initialState: {
        charactersList: [],
        filteredCharacters: [],
        charFilterName: ""
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

        favourite: (state, action) => {
            console.log(action.payload)
            const teste = [...state.charactersList]
            const char = teste.find(c => c.id === action.payload.id)
            char.favourite = !char.favourite
            console.log(current(state.charactersList))
            //state.charactersList = [...state.charactersList, {...state.charactersList[char], favourite: true}]
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
export const getCharactersFromAPI = (pageNumber) => {
    return async (dispatch, getState) => {

        const userFavourites = getState().user.favourites

        try {
            const characters = await rickandmortyapi.get(`${routes.CHARACTERS}/?page=${pageNumber}`)
            const { data: { results } } = characters
            const charactersArray = results.map(character => {

                return {
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    image: character.image,
                    episode: character.episode,
                    favourite: false
                }
            })

            dispatch(setCharacters(charactersArray))
        } catch (e) {
            alert(e)
        }
    }
}

export const charactersSelector = (state => state.characters.charactersList)
export const filterSelector = (state => state.characters.filteredCharacters)
export const filterCharName = (state => state.characters.charFilterName)

export const { setCharacters, setCharacterFilter, cleanFilter, setFilter, favourite } = charactersReducer.actions

export default charactersReducer.reducer
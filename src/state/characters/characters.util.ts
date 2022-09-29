import { ICharacter } from "types/character.type"

/**
     * Faz a sanitização dos dados e compara com o array de favoritos.
     * Se o objeto que está chegando já estiver no array de favoritos, 
     * ele substitui o objeto que está chegando. Isso permite que 
     * as renderizações tanto da tela inicial quanto da tela de favoritos
     * estejam em sincronia         
     * @param {[]} results 
     * @param {[]} fav 
     * @returns [{}]
        */
export function sanitizedData(results: ICharacter[], fav: ICharacter[]) {
    const array: ICharacter[] = results.map(character => {
        if (fav.length > 0) {
            for (let i = 0; i < fav.length; i++) {
                if (fav[i].id === character.id) {
                    return fav[i]
                }
            }
        }
        return {
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: character.origin,
            image: character.image,
            episode: character.episode,
            favourite: false
        }
    })


    return array
}
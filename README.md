# Rick and Morty com Redux/Thunk e Typescript
Esse projeto utiliza o gerenciador de estado Redux + Thunk e tem tipagem com typescript. 

## State
* __./characters.slice__
Onde fica armazenado os estados relacionados aos personagens do seriado. Em tempo: 
  * __charactersList__
  Guarda o array de personagens a ser renderizado no componente <GradePersonagens>.
  * __filteredCharacters__
  Feature que filtra os personagens renderizados e guarda essa informação dentro do estado.
  * __charFilterName__
  Utilizado em conjunto com a feature acima
  * __pageNumber__
  É a informação de qual página a função assíncrona (Thunk) deve buscar
* __./user.slice__
  * __favourites__
  Guarda um array de personagens que foram favoritados
  * __detail__
  O personagem selecionado e renderizado na página <Detalhes>
  * __detailEpisodesArray__
  O array de episodios em que aquele personagem na página de detalhes participou
## Features
* Opção de favoritar
* Renderização dinâmica: os personagens na página de favoritos e aqueles na página inicial são sincronizados
* Filtragem de personagens
## Como executar esse projeto?
1. Faça o clone do repositório
2. `cd rickAndMorty-redux-ts`
3. `npm i` | `yarn`
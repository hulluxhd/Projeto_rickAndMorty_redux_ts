import BotaoFavorito from "../botoes/botao-favorito.componente";
import "./card-personagem.css";
import { useDispatch } from "react-redux"
import { addToFavourite, favouriteThunk } from "../../state/user/user.slice";

/**
 * Card para cada personagem dentro da grade de personagem.
 *
 * Você precisará adicionar as propriedades necessárias para exibir os dados dos personagens
 *
 *
 * @returns Elemento JSX
 */
const CardPersonagem = ({ character }) => {

  const { image, name } = character;

  const dispatch = useDispatch()


  return (
    <div className="card-personagem">
      <img
        src={image}
        alt={name}
      />
      <div className="card-personagem-body">
        <span>{name}</span>
        <BotaoFavorito onClick={() => dispatch(favouriteThunk(character))} isFavorito={character.favourite} />
      </div>
    </div>
  );
};

export default CardPersonagem;

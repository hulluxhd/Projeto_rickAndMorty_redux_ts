import "./grade-personagem.css";
import CardPersonagem from "./card-personagem.componente";
import { useSelector } from "react-redux"
import { charactersSelector, filterSelector } from "../../state/characters/characters.slice";

/**
 * Grade de personagens para a página inicial
 *
 * Você precisará adicionar as funções necessárias para exibir e paginar os personagens
 *
 *
 * @returns Elemento JSX
 */
const GradePersonagem = ({ characters }) => {
    console.log(characters)
  return (
    <div className="grade-personagens">
      {characters.map(character => <CardPersonagem key={character.id} character={character} />)}
    </div>
  );
};

export default GradePersonagem;

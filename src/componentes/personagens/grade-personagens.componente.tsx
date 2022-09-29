import "./grade-personagem.css";
import CardPersonagem from "./card-personagem.componente";
import { GradePersonagemProps } from "./grade-personagem.type";

/**
 * Grade de personagens para a página inicial
 *
 * Você precisará adicionar as funções necessárias para exibir e paginar os personagens
 *
 *
 * @returns Elemento JSX
 */
const GradePersonagem = (props: GradePersonagemProps) => {

  const { characters } = props

  return (
    <div className="grade-personagens">
      {characters.map(character => <CardPersonagem key={character.id} character={character} />)}
    </div>
  );
};

export default GradePersonagem;

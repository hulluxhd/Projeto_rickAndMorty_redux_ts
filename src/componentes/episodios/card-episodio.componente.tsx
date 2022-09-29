import "./card-episodio.css";
import { CardEpisodioProps } from "./card-episodio.types";

/**
 * Card para cada episódio na visualização do personagem.
 *
 * Você precisará adicionar as propriedades necessárias para exibir os dados dos episódios
 *
 *
 * @returns Elemento JSX
 */
const CardEpisodio = (props: CardEpisodioProps) => {
  const { name, air_date, episode } = props.episode

  return (
    <div className="card-episodio">
      <h4>{name}</h4>
      <div>
        <span>{episode}</span>
        <span>Lançado em: {air_date}</span>
      </div>
    </div>
  );
};

export default CardEpisodio;

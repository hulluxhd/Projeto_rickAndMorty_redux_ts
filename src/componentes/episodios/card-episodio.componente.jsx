import "./card-episodio.css";

/**
 * Card para cada episódio na visualização do personagem.
 *
 * Você precisará adicionar as propriedades necessárias para exibir os dados dos episódios
 *
 *
 * @returns Elemento JSX
 */
const CardEpisodio = ({ episode }) => {
  const { name, air_date, episode: ep } = episode

  return (
    <div className="card-episodio">
      <h4>{name}</h4>
      <div>
        <span>{ep}</span>
        <span>Lançado em: {air_date}</span>
      </div>
    </div>
  );
};

export default CardEpisodio;

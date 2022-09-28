import "./Detalhe.css";
import BotaoFavorito from "../componentes/botoes/botao-favorito.componente";
import CardEpisodio from "../componentes/episodios/card-episodio.componente";
import { detail, detailEpisodesArray, detailEpisodesThunk } from "../state/user/user.slice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

function getEpisodesId(episodes) {
  const eps = episodes.map(episode => {
    const id = episode.slice(episode.lastIndexOf('/') + 1)
    return id
  })
  return eps
}

/**
 * Esta é a página de detalhes. Aqui você pode mostrar a visão do personagem selecionado junto com a lista de episódios em que ele aparece
 *
 * TRABALHAR NESTE ARQUIVO É OPCIONAL E NÃO É NECESSÁRIO PARA APROVAÇÃO
 *
 *
 *
 * Uso:
 * ``` <PaginaDetalhe /> ```
 *
 * @returns Página de detalhe
 */
const PaginaDetalhe = () => {

  const { name, image, gender, origin: { name: locationName }, favourite, episode } = useSelector(detail)
  const episodesArray = useSelector(detailEpisodesArray)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailEpisodesThunk(getEpisodesId(episode)))

  }, [dispatch])

  return (
    <div className="container">
      <h3>{name}</h3>
      <div className={"detalhe"}>
        <div className={"detalhe-header"}>
          <img
            src={image}
            alt={name}
          />
          <div className={"detalhe-header-texto"}>
            <p>{name}</p>
            <p>Planeta: {locationName}</p>
            <p>Genero: {gender}</p>
          </div>
          <BotaoFavorito isFavorito={favourite} />
        </div>
      </div>
      <h4>Lista de episódios em que o personagem apareceu</h4>
      <div className={"episodios-grade"}>
        {episodesArray.map(episode => <CardEpisodio key={episode.id} episode={episode} />)}


      </div>
    </div>
  );
};

export default PaginaDetalhe;

import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import { useAppSelector, useAppDispatch } from "@state/hooks"
import { clearFavourites, favouritesSelector } from "../state/user/user.slice";

/**
 * Esta é a página de favoritos. Aqui você deve ver todos os personagens marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns Página de favoritos
 */
const PaginaFavoritos = () => {

  const dispatch = useAppDispatch()

  const favourites = useAppSelector(favouritesSelector)

  return (
    <div className="container">
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button onClick={() => dispatch(clearFavourites())} className="danger">Limpar tudo</button>
      </div>
      <GradePersonagens characters={favourites} />
    </div>
  );
};

export default PaginaFavoritos;

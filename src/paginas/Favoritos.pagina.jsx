import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import { useSelector } from "react-redux"
import { favouritesSelector } from "../state/user/user.slice";

/**
 * Esta é a página de favoritos. Aqui você deve ver todos os personagens marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns Página de favoritos
 */
const PaginaFavoritos = () => {

  const favourites = useSelector(favouritesSelector)
  console.log(favourites)

  return (
    <div className="container">
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button className="danger">Test Button</button>
      </div>
      <GradePersonagens characters={favourites} />
    </div>
  );
};

export default PaginaFavoritos;

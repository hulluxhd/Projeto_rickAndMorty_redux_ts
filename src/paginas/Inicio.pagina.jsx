import {useDispatch, useSelector} from "react-redux"

import Filtros from "../componentes/personagens/filtros.componente";
import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import Paginacao from "../componentes/paginacao/paginacao.componente";
import { charactersSelector, cleanFilter, filterSelector } from "../state/characters/characters.slice";

/**
 * Esta é a página principal. Aqui você deve ver o painel de filtro junto com a grade de personagens.
 *
 * Uso:
 * ``` <PaginaInicio /> ```
 *
 * @returns Página inicio
 */
const PaginaInicio = () => {

  const dispatch = useDispatch()
  const initialCharacters = useSelector(charactersSelector)
  const filteredCharacters = useSelector(filterSelector)

  return (
    <div className="container">
      <div className="actions">
        <h3>Catálogo de Personagens</h3>
        <button onClick={() => dispatch(cleanFilter())} className="danger">Limpar filtro</button>
      </div>
      <Filtros />
      <Paginacao />
      <GradePersonagens characters={filteredCharacters.length > 0 ? filteredCharacters : initialCharacters} />
      <Paginacao />
    </div>
  );
};

export default PaginaInicio;

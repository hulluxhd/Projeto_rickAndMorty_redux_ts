import "./filtros.css";
import {useDispatch, useSelector} from "react-redux"
import { filterCharName, filterSelector, setCharacterFilter, setFilter } from "../../state/characters/characters.slice";


const Filtros = () => {

  const dispatch = useDispatch()
  const filter = useSelector(filterCharName)

  return (
    <div className="filtros">
      <label htmlFor="nome">Filtrar por nome:</label>
      <input
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        name="nome"
        value={filter}
        onChange={(e) => {
          dispatch(setFilter(e.target.value))
          dispatch(setCharacterFilter())
        }}
      />
    </div>
  );
};

export default Filtros;

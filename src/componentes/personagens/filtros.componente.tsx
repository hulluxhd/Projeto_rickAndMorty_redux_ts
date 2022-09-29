import "./filtros.css";
import {useAppDispatch, useAppSelector} from "@state/hooks"
import { filterCharName, filterSelector, setCharacterFilter, setFilter } from "../../state/characters/characters.slice";


const Filtros = () => {

  const dispatch = useAppDispatch()
  const filter = useAppSelector(filterCharName)

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

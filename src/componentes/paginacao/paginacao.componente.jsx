import "./paginacao.css";
import { useState, useEffect } from 'react'
import {useDispatch} from "react-redux"
import { getCharactersFromAPI, cleanFilter, setFilter } from "../../state/characters/characters.slice";
/**
 * Componente que contém os botões para paginar
 *
 * Você deve adicionar as propriedades necessárias para que funcione corretamente
 *
 *
 * @returns Elemento JSX
 */
const Paginacao = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(cleanFilter())
    dispatch(getCharactersFromAPI(pageNumber))
  }, [pageNumber])
  

  const pageUp = () => setPageNumber(pageNumber => pageNumber += 1)
  const pageDown = () => setPageNumber(pageNumber => pageNumber -= 1)

  return (

    <div className="paginacao">
      <button onClick={pageDown} disabled={pageNumber === 1 ? true : false} className={"primary"}>
        Anterior
      </button>
      <button onClick={pageUp} disabled={false} className={"primary"}>
        Próximo
      </button>
    </div>
  );
};

export default Paginacao;

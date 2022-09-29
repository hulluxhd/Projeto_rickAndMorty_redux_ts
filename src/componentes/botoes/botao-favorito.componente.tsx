import "./botao-favorito.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { BotoesProps } from "./botoes.types";
/**
 * Botão que indica se um elemento é favorito ou não, e dá a possibilidade de marcá-lo/desmarcá-lo
 *
 * Terá que tipar as propriedades se utilizar este componente
 *
 *
 * @returns Elemento JSX
 */
const BotaoFavorito = (props: BotoesProps) => {
  const { isFavorito, onClick } = props
  const src = isFavorito ? <AiFillStar /> : <AiOutlineStar />;

  return (
    <div onClick={onClick} className="botao-favorito">
      {src}
    </div>
  );
};

export default BotaoFavorito;

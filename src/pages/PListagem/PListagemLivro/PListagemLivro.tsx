import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import ListagemLivros from "../../../components/Listagens/ListagemLivros/ListagemLivros";

function PListagemLivro(): JSX.Element {
    return(
        <>
        <Navegacao />
        <ListagemLivros />
        <Rodape />
        </>
    )
}

export default PListagemLivro;
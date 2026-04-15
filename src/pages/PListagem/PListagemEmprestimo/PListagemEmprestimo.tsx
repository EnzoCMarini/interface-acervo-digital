import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import ListagemEmprestimos from "../../../components/Listagens/ListagemEmprestimos/ListagemEmprestimos";

function PListagemEmprestimo(): JSX.Element {
    return(
        <>
        <Navegacao />
        <ListagemEmprestimos />
        <Rodape />
        </>
    )
}

export default PListagemEmprestimo;
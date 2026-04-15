import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import LoginForm from "../../components/Formularios/FormLogin/FormLogin";

function PLogin(): JSX.Element {
    return(
        <>
        <Navegacao />
        <LoginForm />
        <Rodape />
        </>
    )
}

export default PLogin;
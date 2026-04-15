import { type JSX } from "react";

function ListagemAlunos(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>Alunos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A123456</td>
                        <td>Felisberto Felis</td>
                        <td>felisberto@email.com</td>
                        <td>(67) 6 7676-7676</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                    <td>2</td>
                        <td>A654321</td>
                        <td>Trizteberto Trizte</td>
                        <td>trizteberto@email.com</td>
                        <td>(69) 6 9696-9696</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default ListagemAlunos;
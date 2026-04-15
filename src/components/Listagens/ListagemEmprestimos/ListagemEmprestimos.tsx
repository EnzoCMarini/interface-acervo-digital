import { type JSX } from "react";

function ListagemEmprestimos(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>Alunos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID do Aluno</th>
                        <th>ID do Livro</th>
                        <th>Data de Empréstimo</th>
                        <th>Data de Devolução</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>1</td>
                        <td>2026-05-27</td>
                        <td>2026-07-10</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>2</td>
                        <td>2026-04-30</td>
                        <td>2026-06-14</td>
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

export default ListagemEmprestimos;
import { type JSX } from "react";

function ListagemLivros(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>LiListagemLivros</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Ano de Publicação</th>
                        <th>ISBN</th>
                        <th>Quantidade Total</th>
                        <th>Quantidade Disponível</th>
                        <th>Valor Aquisição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>O Morro Dos Ventos Uivantes</td>
                        <td>Emily Bronte</td>
                        <td>Penguin Books</td>
                        <td>1847</td>
                        <td>978-0141439556</td>
                        <td>10</td>
                        <td>9</td>
                        <td>R$ 39,90</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Don Quixote</td>
                        <td>Miguel de Cervantes</td>
                        <td>Penguin Books</td>
                        <td>1605</td>
                        <td>978-0142437230</td>
                        <td>15</td>
                        <td>14</td>
                        <td>R$ 49,90</td>
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

export default ListagemLivros;
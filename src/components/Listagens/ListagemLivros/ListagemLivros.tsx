import { type JSX } from "react";
import { useState, useEffect } from "react";
import LivroRequests from "../../../fetch/LivroRequests";
import type LivroDTO from "../../../dto/LivroDTO";

function ListagemLivros(): JSX.Element {
    const [livros, setLivros] = useState<LivroDTO[]>([]);

    useEffect(() => {
        const buscarLivros = async () => {
            try {
                const listaDeLivros = await LivroRequests.listarLivros();
                setLivros(listaDeLivros);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar a listagem de livros.");
            }
        }

        buscarLivros();
    }, []);

    return (
        <main className="bg-gray-200 h-[76vh]"> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Livros</h1>
                <a href="#" className="w-1/10 text-md p-3 bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Novo Livro
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">Titulo</th>
                            <th className="border border-slate-600 text-white">Autor</th>
                            <th className="border border-slate-600 text-white">Editora</th>
                            <th className="border border-slate-600 text-white">Ano de Lançamento</th>
                            <th className="border border-slate-600 text-white">ISBN</th>
                            <th className="border border-slate-600 text-white">Quant. Total</th>
                            <th className="border border-slate-600 text-white">Quant. Disponível</th>
                            <th className="border border-slate-600 text-white">Valor Aquisição</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody> {/* Dados fictícios (por enquanto) */}
                            {livros.map((livros) => (
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>{livros.id_livro}</td>
                            <td>{livros.titulo}</td>
                            <td>{livros.autor}</td>
                            <td>{livros.editora}</td>
                            <td>{livros.ano_publicacao}</td>
                            <td>{livros.isbn}</td>
                            <td>{livros.quant_total}</td>
                            <td>{livros.quant_disponivel}</td>
                            <td>{livros.valor_aquisicao}</td>
                            <td>
                                <a href="#" className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a href="#" className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a href="#" className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ListagemLivros;
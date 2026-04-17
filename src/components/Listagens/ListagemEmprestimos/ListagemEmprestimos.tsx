import { type JSX } from "react";
import { useState, useEffect } from "react";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";

function ListagemEmprestimos(): JSX.Element {
    const [emprestimos, setEmprestimos] = useState<EmprestimoDTO[]>([]);

    useEffect(() => {
        const buscarEmprestimos = async () => {
            try {
                const listaDeEmprestimos = await EmprestimoRequests.listarEmprestimos();
                setEmprestimos(listaDeEmprestimos);
            } catch (error) {
                console.error(`Erro ao buscar emprestimos. ${error}`);
                alert("Erro ao criar a listagem de emprestimos.");
            }
        }

        buscarEmprestimos();
    }, []);

    return (
        <main className="bg-gray-200 h-[76vh]"> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Empréstimos</h1>
                <a href="#" className="w-1/10 p-3 bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Novo Empréstimo
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">Aluno</th>
                            <th className="border border-slate-600 text-white">Livro</th>
                            <th className="border border-slate-600 text-white">Retirada</th>
                            <th className="border border-slate-600 text-white">Devolução</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody> {/* Dados fictícios (por enquanto) */}
                        {emprestimos.map((emprestimos) => (
                            <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                                <td>{emprestimos.id_emprestimo}</td>
                                <td className="p-3">{emprestimos.aluno.nome} {emprestimos.aluno.sobrenome}</td>
                                <td>{emprestimos.livro.titulo}</td>
                                <td>{emprestimos.data_emprestimo ? new Date(emprestimos.data_emprestimo).toLocaleDateString() : ""}</td>
                                <td>{emprestimos.data_devolucao ? new Date(emprestimos.data_devolucao).toLocaleDateString(): ""}</td>
                                <td>
                                    <a href="#" className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-sm text-white text-center">Detalhes</a>
                                    <a href="#" className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-sm text-white">Atualizar</a>
                                    <a href="#" className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-sm text-white">Deletar</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ListagemEmprestimos;
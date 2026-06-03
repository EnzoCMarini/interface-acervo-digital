import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesEmprestimoProps {
    id_emprestimo: number;
}

/**
 * Componente que exibe os detalhes de um Emprestimo.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalhesEmprestimo({ id_emprestimo }: DetalhesEmprestimoProps): JSX.Element {
    const [Emprestimo, setEmprestimo] = useState<EmprestimoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await EmprestimoRequests.obterEmprestimoPorId(id_emprestimo);
                if (dados) {
                    setEmprestimo(dados);
                } else {
                    setError("Emprestimo não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do Emprestimo:", err);
                setError("Ocorreu um erro ao buscar as informações do Emprestimo.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_emprestimo]);

    // Renderização do estado de carregamento (Skeleton)
    if (loading) {
        return (
            <Card className="shadow-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton shape="circle" size="4rem"></Skeleton>
                        <div className="flex-1">
                            <Skeleton width="60%" height="2rem" className="mb-2"></Skeleton>
                            <Skeleton width="40%"></Skeleton>
                        </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i}>
                                <Skeleton width="30%" className="mb-2"></Skeleton>
                                <Skeleton width="80%" height="1.5rem"></Skeleton>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    // Renderização do estado de erro
    if (error || !Emprestimo) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do Emprestimo {/* Seção de informações do Emprestimo */}


    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <Card title={`Emprestimo #${Emprestimo.id_emprestimo}`} className="shadow-lg animate-fade-in transition-all duration-300 w-full max-w-4xl p-4 sm:p-6 md:p-8 mx-auto font-bold text-xl">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="text-gray-500 font-medium tracking-tight">Status do Empréstimo</span>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 p-tag p-component p-tag-info" data-pc-name="tag" data-pc-section="root">
                                <span className="p-tag-value" data-pc-section="value">{`${Emprestimo.status_emprestimo}`}</span><span></span></span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data do Empréstimo</span>
                            <span className="text-gray-700 font-medium">{Emprestimo.data_emprestimo ? new Date(Emprestimo.data_emprestimo).toLocaleDateString('pt-BR') : ''}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data de Devolução</span>
                            <span className="text-gray-700 font-medium">{Emprestimo.data_devolucao ? new Date(Emprestimo.data_devolucao).toLocaleDateString('pt-BR') : ''}</span>
                        </div>
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        {/* Seção de Informações do Aluno */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-user text-blue-500"></i> Informações do Aluno
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-blue-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">ID do Aluno</span>
                                    <span className="text-gray-700 font-medium break-all">{Emprestimo.aluno.id_aluno}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Registro Acadêmico (RA)</span>
                                    <span className="text-gray-700 font-medium break-all">{Emprestimo.aluno.ra}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Nome</span>
                                    <span className="text-gray-700 font-medium">{`${Emprestimo.aluno.nome} ${Emprestimo.aluno.sobrenome}`}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">E-mail Acadêmico</span>
                                    <span className="text-gray-700 font-medium break-all">{Emprestimo.aluno.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Celular / Telefone</span>
                                    <span className="text-gray-700 font-medium break-all">{Emprestimo.aluno.celular}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Emprestimo</span>
                                    <Tag
                                        value={Emprestimo.aluno.status_aluno ? "Ativo" : "Inativo"}
                                        severity={Emprestimo.aluno.status_aluno ? "success" : "danger"}
                                        className="w-fit mt-1 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Seção de Informações de Livro */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-map-marker text-orange-500"></i> Informações de Livro
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-orange-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">ID do Livro</span>
                                    <span className="text-gray-700 font-medium">{Emprestimo.livro.id_livro}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Titulo</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.titulo}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Autor</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.autor}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Editora</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.editora}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Ano de Publicação</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.ano_publicacao ? Emprestimo.livro.ano_publicacao : "Não Informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">International Standard Book Number (ISBN)</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.isbn}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Disponivel</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">{Emprestimo.livro.quant_disponivel ? Emprestimo.livro.quant_disponivel : "— / —"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Livro Emprestado</span>
                                    <Tag
                                        value={Emprestimo.livro.status_livro_emprestado ? "Ativo" : "Inativo"}
                                        severity={Emprestimo.livro.status_livro_emprestado ? "success" : "danger"}
                                        className="w-fit mt-1 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            </Card>
            <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-500 text-white px-4 py-3 md:mb-2 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/atualizar/Emprestimo/${Emprestimo.id_emprestimo}`)}
                >
                    Editar Emprestimo
                </button>
                <button
                    className="w-full bg-white text-black hover:bg-slate-500 px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/lista/emprestimos`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesEmprestimo;
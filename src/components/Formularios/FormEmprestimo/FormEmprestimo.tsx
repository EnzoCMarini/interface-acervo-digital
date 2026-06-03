import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';

function FormEmprestimo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<EmprestimoDTO>({
        id_emprestimo: 0,
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: new Date(),
        data_devolucao: undefined,
        status_emprestimo: ''
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Campos aninhados do aluno
        if (name === 'id_aluno') {
            setFormData(prev => ({ ...prev, aluno: { ...prev.aluno, id_aluno: parseInt(value) } }));
            return;
        }

        // Campos aninhados do livro
        if (name === 'id_livro') {
            setFormData(prev => ({ ...prev, livro: { ...prev.livro, id_livro: parseInt(value) } }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // Chama o método que irá fazer a requisição à API
        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(formData);
        if (resposta) {
            alert("Empréstimo cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar empréstimo");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Empréstimo
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: ID do Aluno e ID do Livro */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ID do Aluno
                                </label>
                                <input
                                    type="number"
                                    name="id_aluno"
                                    id="id_aluno"
                                    required
                                    onChange={handleChange}
                                    placeholder="Digite o ID do aluno"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="id_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ID do Livro
                                </label>
                                <input
                                    type="number"
                                    name="id_livro"
                                    id="id_livro"
                                    required
                                    onChange={handleChange}
                                    placeholder="Digite o ID do livro"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Data de Empréstimo e Data de Devolução */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Empréstimo
                                </label>
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="data_devolucao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Devolução
                                </label>
                                <input
                                    type="date"
                                    name="data_devolucao"
                                    id="data_devolucao"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Status do Empréstimo */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="status_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Status do Empréstimo
                                </label>
                                <input
                                    type="text"
                                    name="status_emprestimo"
                                    id="status_emprestimo"
                                    onChange={handleChange}
                                    placeholder="Ex: Em andamento, Devolvido..."
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR EMPRÉSTIMO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormEmprestimo;
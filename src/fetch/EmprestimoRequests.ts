// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
    private serverUrl;
    private endpointListarEmprestimos;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointListarEmprestimos = '/api/emprestimos';
    }

    async listarEmprestimos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointListarEmprestimos}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error('Não foi possível listar as Emprestimos.');
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de emprestimos. ${error}`);
            return;
        }
    }

}

export default new EmprestimoRequests;
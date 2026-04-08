// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
    private serverUrl: string;
    private endpointListarEmprestimos: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointListarEmprestimos = '/api/emprestimos';
    }

    async listarEmprestimos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointListarEmprestimos}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if(!response.ok) {
                throw new Error('Não foi possível listar as Emprestimos.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

}

export default new EmprestimoRequests();
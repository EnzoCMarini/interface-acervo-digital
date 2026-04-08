// Classe responsável por fazer requisições à API - aluno
class AlunoRequests {
    private serverUrl: string;
    private endpointListarAluno: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointListarAluno = '/api/aluno';
    }

    async listarAluno() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointListarAluno}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível listar o aluno.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

}

export default new AlunoRequests();
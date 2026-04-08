// Classe responsável por fazer requisições à API - livro
class LivroRequests {
    private serverUrl: string;
    private endpointListarLivros: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointListarLivros = '/api/livros';
    }

    async listarLivros() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointListarLivros}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if(!response.ok) {
                throw new Error('Não foi possível listar as livros.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

}

export default new LivroRequests();
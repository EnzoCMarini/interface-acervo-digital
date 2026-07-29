// Classe responsável por fazer requisições à API - livro
import type LivroDTO from "../dto/LivroDTO";
const API_URL = import.meta.env.VITE_API_SERVER_URL;

class LivroRequests {
    private serverURL;
    private endpointLivro;

    constructor() {
        this.serverURL = API_URL;
        this.endpointLivro = '/api/livros';
    }

    async obterListaDeLivros() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointLivro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeLivros = await respostaAPI.json();
                return listaDeLivros;
            } else {
                throw new Error(`Não foi possível listar os livros.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }

    async obterLivroPorId(id_livro: number): Promise<LivroDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointLivro}/${id_livro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const Livro: LivroDTO = await respostaAPI.json();
                return Livro;
            } else {
                throw new Error("Não foi possível buscar o livro.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livro por ID. ${error}`);
            return;
        }
    }

    async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointLivro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formLivro)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }

    async removerLivro(id_Livro: number): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointLivro}/${id_Livro}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }
}

export default new LivroRequests;
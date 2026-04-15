import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemEmprestimo from './pages/PListagem/PListagemEmprestimo/PListagemEmprestimo'
import PListagemLivro from './pages/PListagem/PListagemLivro/PListagemLivro'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element={<PLogin />} />
        <Route path='/listagemalunos' element={<PListagemAluno />} />
        <Route path='/listagemlivros' element={<PListagemLivro />} />
        <Route path='/listagememprestimos' element={<PListagemEmprestimo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

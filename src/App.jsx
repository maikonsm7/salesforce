import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { Recovery } from './pages/auth/Recovery'
import { Register } from './pages/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
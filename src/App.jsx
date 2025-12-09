import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { Recovery } from './pages/auth/Recovery'
import { Register } from './pages/auth/Register'
import { AuthContextProvider } from './context/AuthContext'
import { Nav } from './components/Nav'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './pages/home/Home'

function App() {
  return (
    <>
      <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />}/>
          </Route>

          {/* Publi routes */}
          <Route path='/' element={<Login />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
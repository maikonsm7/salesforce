import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { Recovery } from './pages/auth/Recovery'
import { Register } from './pages/auth/Register'
import { AuthContextProvider, AuthContext } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './pages/home/Home'
import { Production } from './pages/production/Production'
import { Dashboard } from './pages/dashboard/Dashboard'
import { PrivateLayout } from './components/PrivateLayout'
import { Users } from './pages/users/Users'
import { CreateUser } from './pages/users/CreateUser'
import { UpdateUser } from './pages/users/UpdateUser'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>

            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<PrivateLayout />}>
                <Route path='/home' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/update/:id' element={<UpdateUser />} />
                <Route path='/users/create' element={<CreateUser />} />
                <Route path='/productions' element={<Production />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
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
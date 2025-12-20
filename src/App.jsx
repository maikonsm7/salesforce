import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/auth/Login'
import { Recovery } from './pages/auth/Recovery'
import { Register } from './pages/auth/Register'
import { AuthContextProvider, AuthContext } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './pages/home/Home'
import { Dashboard } from './pages/dashboard/Dashboard'
import { PrivateLayout } from './components/PrivateLayout'
import { Users } from './pages/user/Users'
import { CreateUser } from './pages/user/CreateUser'
import { UpdateUser } from './pages/user/UpdateUser'
import { Clients } from './pages/client/Clients'
import { CreateClient } from './pages/client/CreateClient'
import { UpdateClient } from './pages/client/UpdateClient'
import { Productions } from './pages/production/Productions'
import { CreateProduction } from './pages/production/CreateProduction'
import { UpdateProduction } from './pages/production/UpdateProduction'

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
                <Route path='/clients' element={<Clients />} />
                <Route path='/clients/create' element={<CreateClient />} />
                <Route path='/clients/update/:id' element={<UpdateClient />} />
                <Route path='/productions' element={<Productions />} />
                <Route path='/productions/create' element={<CreateProduction />} />
                <Route path='/productions/update/:id' element={<UpdateProduction />} />
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
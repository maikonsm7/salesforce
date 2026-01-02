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
import { User } from './pages/user/User'
import { CreateUser } from './pages/user/CreateUser'
import { UpdateUser } from './pages/user/UpdateUser'
import { Clients } from './pages/client/Clients'
import { Client } from './pages/client/Client'
import { CreateClient } from './pages/client/CreateClient'
import { UpdateClient } from './pages/client/UpdateClient'
import { Productions } from './pages/production/Productions'
import { CreateProduction } from './pages/production/CreateProduction'
import { UpdateProduction } from './pages/production/UpdateProduction'
import { DeleteProduction } from './pages/production/DeleteProduction'
import { Production } from './pages/production/Production'
import { GrantDates } from './pages/grant-date/GrantDates'
import { GrantDate } from './pages/grant-date/GrantDate'
import { CreateGrantDate } from './pages/grant-date/CreateGrantDate'
import { UpdateGrantDate } from './pages/grant-date/UpdateGrantDate'
import { DeleteGrantDate } from './pages/grant-date/DeleteGrantDate'
import { UpdatePassword } from './pages/auth/UpdatePassword'
import { PasswordReset } from './pages/auth/PasswordReset'
import { Alerts } from './pages/alert/Alerts'
import { Alert } from './pages/alert/Alert'
import { CreateAlert } from './pages/alert/CreateAlert'
import { UpdateAlert } from './pages/alert/UpdateAlert'
import { DeleteAlert } from './pages/alert/DeleteAlert'

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
                <Route path='/users/:id' element={<User />} />
                <Route path='/users/update/:id' element={<UpdateUser />} />
                <Route path='/users/create' element={<CreateUser />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/clients/:id' element={<Client />} />
                <Route path='/clients/create' element={<CreateClient />} />
                <Route path='/clients/update/:id' element={<UpdateClient />} />
                <Route path='/productions' element={<Productions />} />
                <Route path='/productions/:id' element={<Production />} />
                <Route path='/productions/create' element={<CreateProduction />} />
                <Route path='/productions/update/:id' element={<UpdateProduction />} />
                <Route path='/productions/delete/:id' element={<DeleteProduction />} />
                <Route path='/grant-dates' element={<GrantDates />} />
                <Route path='/grant-dates/:id' element={<GrantDate />} />
                <Route path='/grant-dates/create' element={<CreateGrantDate />} />
                <Route path='/grant-dates/update/:id' element={<UpdateGrantDate />} />
                <Route path='/grant-dates/delete/:id' element={<DeleteGrantDate />} />
                <Route path='/alerts' element={<Alerts />} />
                <Route path='/alerts/:id' element={<Alert />} />
                <Route path='/alerts/create' element={<CreateAlert />} />
                <Route path='/alerts/update/:id' element={<UpdateAlert />} />
                <Route path='/alerts/delete/:id' element={<DeleteAlert />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile/password-update' element={<UpdatePassword />} />
              </Route>
            </Route>

            {/* Publi routes */}
            <Route path='/' element={<Login />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password-reset' element={<PasswordReset />} />

          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
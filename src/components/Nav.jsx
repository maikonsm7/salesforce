import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { firstLastName } from "../helpers/general";
import logo from '/logo.svg'

export const Nav = () => {
  const { logout, user } = useAuth()

  return (
    <>
      <div className="p-3 min-vh-100" style={{ width: '280px' }}>
        <div className="d-flex align-items-center mb-2 mb-md-0 me-md-auto text-white">
          <img src={logo} alt="" width="35" />
          <div className="d-flex flex-column mx-3">
            <span className="fs-4">Sales Force</span>
            <span className="logged-user">{firstLastName(user.name) || ''}</span>
          </div>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/home"><i className="bi bi-house me-2"></i>Home</NavLink></li>

          {['MASTER', 'ADMIN'].includes(user.role) && (
            <li className="nav-item"><NavLink className="nav-link navbar-link" to="/users"><i className="bi bi-person me-2"></i>Usuários</NavLink></li>
          )}

          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/clients"><i className="bi bi-people me-2"></i>Clientes</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/productions"><i className="bi bi-journal-check me-2"></i>Produções</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/grant-dates"><i className="bi bi-calendar-date me-2"></i>Data de Concessão</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/dashboard"><i className="bi bi-speedometer2 me-2"></i>Dashboard</NavLink></li>

          <h6 className="mt-4" style={{ color: '#616d77' }}>
            <span>MEU PERFIL</span>
          </h6>

          <li className="nav-item"><NavLink className="nav-link navbar-link" to="/profile/password-update"><i className="bi bi-lock me-2"></i>Alterar senha</NavLink></li>
          <li className="nav-item"><Link className="nav-link navbar-link" onClick={logout}><i className="bi bi-box-arrow-left me-2"></i>Sair</Link></li>
        </ul>

      </div>
    </>
  )
}
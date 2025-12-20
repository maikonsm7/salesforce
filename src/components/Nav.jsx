import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from '/logo.svg'

export const Nav = () => {
  const { logout, user } = useAuth()

  return (
    <>
      <div className="p-3 min-vh-100" style={{ width: '280px' }}>
        <Link className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img src={logo} className="me-2" alt="" width="25" />
          <span className="fs-4">Sales Force</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item"><NavLink className="nav-link" to="/home"><i className="bi bi-house me-2"></i>Home</NavLink></li>
          
          {user.role === 'ADMIN' && (
            <li className="nav-item"><NavLink className="nav-link" to="/users"><i className="bi bi-person me-2"></i>Usuários</NavLink></li>
          )}
          
          <li className="nav-item"><NavLink className="nav-link" to="/productions"><i className="bi bi-journal-check me-2"></i>Production</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/dashboard"><i className="bi bi-speedometer2 me-2"></i>Dashboard</NavLink></li>

          <h6 className="mt-4" style={{color: '#616d77'}}>
            <span>MEU PERFIL</span>
          </h6>

          <li className="nav-item"><Link className="nav-link" onClick={logout}><i className="bi bi-box-arrow-left me-2"></i>Sair</Link></li>
        </ul>

      </div>
    </>
  )
}
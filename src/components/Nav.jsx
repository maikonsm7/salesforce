import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { firstLastName } from "../helpers/general";
import logo from '/logo.svg'
import { Message } from "./Message";

export const Nav = () => {
  const { logout, user } = useAuth()

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
        <div className="navbar-brand col-md-3 col-lg-2 me-0 px-2 fs-6 text-white d-flex align-items-center">
          <img src={logo} className="me-2" alt="logo" width="35" />
          <div className="d-flex flex-column mx-2">
            <span className="fs-5">Sales Force</span>
            <span className="logged-user">{firstLastName(user.name) || ''}</span>
          </div>
        </div>

        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
            aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list"></i>
          </button>
          </li>
        </ul>
      </header>
      
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar col-md-3 col-lg-2 p-0">
            <div className="offcanvas-md offcanvas-end border vh-100 col-md-3 col-lg-2 bg-body-tertiary position-fixed" id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel">
              <div className="offcanvas-header">
                <img src={logo} className="me-2" alt="logo" width="25" />
                <h5 className="offcanvas-title" id="sidebarMenuLabel">Sales Force</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                  aria-label="Close"></button>
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul className="nav flex-column">
                  <li className="nav-item"><NavLink className="nav-link navbar-link" to="/home"><i className="bi bi-house me-2"></i>Home</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link navbar-link" to="/clients"><i className="bi bi-people me-2"></i>Clientes</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link navbar-link" to="/productions"><i className="bi bi-journal-check me-2"></i>Produções</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link navbar-link" to="/alerts"><i className="bi bi-exclamation-triangle me-2"></i>Alertas</NavLink></li>

                  {['MASTER', 'ADMIN'].includes(user.role) && (<>
                    <li className="nav-item"><NavLink className="nav-link navbar-link" to="/users"><i className="bi bi-person me-2"></i>Usuários</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link navbar-link" to="/dashboard"><i className="bi bi-speedometer2 me-2"></i>Dashboard</NavLink></li>
                  </>)}

                  <h6 className="mt-4 mx-2" style={{ color: '#616d77' }}>
                    <span>MEU PERFIL</span>
                  </h6>

                  <li className="nav-item"><NavLink className="nav-link navbar-link" to="/profile/password-update"><i className="bi bi-lock me-2"></i>Alterar senha</NavLink></li>
                  <li className="nav-item"><Link className="nav-link navbar-link" onClick={logout}><i className="bi bi-box-arrow-left me-2"></i>Sair</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <main className="col p-3 container">
            <Message />
            <Outlet />
          </main>

        </div>
      </div>
    </>
  )
}
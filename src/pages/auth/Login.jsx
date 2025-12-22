import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import logo from '/logo.svg'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { Message } from '../../components/Message'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showpass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await login(email, password)
        setLoading(false)
    }
    return (
        <>
            <main className="form-signin w-100 m-auto mt-4">
                <Message />
                <form onSubmit={handleSubmit} className='text-center'>
                    <img className="mb-3" src={logo} alt="" width="50"/>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    <div className="form-floating">
                        <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating">
                        <input 
                        type={showpass ? "text" : "password"} 
                        className="form-control" 
                        id="password" 
                        placeholder="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Senha</label>
                        <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowPass(!showpass)}>
                            <i className={`bi ${showpass ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>
                    <button className="btn btn-info w-100 py-2 mt-2" type="submit">
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className='text-center mt-4'>
                <Link to='/recovery' className='link-info'>Esqueci minha senha</Link>
                </div>
                <div className='text-center form-text mt-4'>
                Ainda não possui cadastro? <Link to='/register' className='link-info'>Cadastrar-me</Link>
                </div>

                <Footer />

            </main>
        </>
    )
}
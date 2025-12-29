import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useSearchParams, Link } from "react-router-dom"
import { Footer } from "../../components/Footer"
import { Message } from "../../components/Message"

export const PasswordReset = () => {
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code') || ''
    const { passReset } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await passReset(code, password)
        setPassword('')
        setLoading(false)
    }

    return (
        <>
            <Message />
            <h3 className="text-center fw-normal">Resetar Senha</h3>

            <main className="m-auto form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">

                        <input
                            type={showPass ? "text" : "password"}
                            className="form-control"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Nova senha</label>
                        <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowPass(!showPass)}>
                            <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>

                    <p className={`form-text ${password.length > 5 ? 'text-success' : 'text-danger'}`}><i className={`bi bi-${password.length > 5 ? 'check' : 'x'}`}></i> No mínimo 6 caracteres</p>

                    <button className="btn btn-info w-100 mt-2" type="submit">
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className='text-center mt-4'>
                    <Link to='/' className='link-info'>Início</Link>
                </div>
                <Footer />
            </main>
        </>
    )
}

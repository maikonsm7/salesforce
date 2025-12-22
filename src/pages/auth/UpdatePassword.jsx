import { useState } from "react"
import useAuth from "../../hooks/useAuth"

export const UpdatePassword = () => {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { updatePass } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await updatePass(password, newPassword)
        setPassword('')
        setNewPassword('')
        setLoading(false)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Alterar Senha</h3>

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
                        <label htmlFor="password">Senha atual</label>
                        <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowPass(!showPass)}>
                            <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>

                    <div className="form-floating">
                        <input
                            type={showNewPass ? "text" : "password"}
                            className="form-control"
                            id="newPassword"
                            placeholder="newPassword"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <label htmlFor="newPassword">Nova senha</label>
                        <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowNewPass(!showNewPass)}>
                            <i className={`bi ${showNewPass ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>

                    <p className={`form-text ${newPassword.length > 5 ? 'text-success' : 'text-danger'}`}><i className={`bi bi-${newPassword.length > 5 ? 'check' : 'x'}`}></i> No mínimo 6 caracteres</p>

                    <button className="btn btn-info w-100 mt-2" type="submit">
                        {loading ? 'Alterando...' : 'Alterar'}
                    </button>
                </form>
            </main>            
        </>
    )
}

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import useUser from "../../hooks/useUser"

export const UpdateUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [active, setActive] = useState("true")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { update, getById } = useUser()

    useEffect(() => {
        const loadData = async () => {
            const data = await getById(id)
            setName(data.name)
            setEmail(data.email)
            setActive(data.active)
        }
        loadData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await update({ name, email, active }, id)
        setLoading(false)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Atualizar Usuário</h3>

            <main className="m-auto form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="name">Email</label>
                    </div>

                    <div className="row">
                        <label htmlFor="active" className="col col-form-label">Usuário Ativo ?</label>
                        <div className="col-sm-7">
                            <select className="form-select" id="active" name="active" value={active} onChange={e => setActive(e.target.value)}>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-info w-100 mt-4" type="submit">{loading ? 'Atualizando...' : 'Atualizar'}</button>
                </form>
            </main>

            <div className="mt-3 text-center">
                <Link className="link-info" to="/users">Voltar</Link>
            </div>
        </>
    )
}

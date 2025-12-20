import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import useClient from "../../hooks/useClient"

export const UpdateClient = () => {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const [observation, setObservation] = useState("")
    const { id } = useParams()
    const { update, getById } = useClient()

    useEffect(() => {
        const loadData = async () => {
            const data = await getById(id)
            setName(data.name)
            setCpf(data.cpf)
            setPhone(data.phone)
            setObservation(data.observation)
        }
        loadData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        update({ name, cpf, phone, observation }, id)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Atualizar Cliente</h3>

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
                            type="cpf"
                            className="form-control"
                            id="cpf"
                            placeholder="cpf"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                        />
                        <label htmlFor="name">CPF</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="phone"
                            className="form-control"
                            id="phone"
                            placeholder="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <label htmlFor="name">Telefone</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="observation"
                            className="form-control"
                            id="observation"
                            placeholder="observation"
                            value={observation}
                            onChange={e => setObservation(e.target.value)}
                        />
                        <label htmlFor="name">Observação</label>
                    </div>

                    <button className="btn btn-info w-100 mt-2" type="submit">Atualizar</button>
                </form>
            </main>

            <div className="mt-3 text-center">
                <Link className="link-info" to="/clients">Voltar</Link>
            </div>
        </>
    )
}

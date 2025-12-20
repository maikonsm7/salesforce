import { useState } from "react"
import useClient from "../../hooks/useClient"
import { Link } from "react-router"

export const CreateClient = () => {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const [observation, setObservation] = useState("")
    const { create } = useClient()

    const handleSubmit = e => {
        e.preventDefault()
        create({ name, cpf, phone, observation })
    }

    return (
        <>
            <h3 className="text-center fw-normal">Cadastrar Cliente</h3>

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
                        <label htmlFor="cpf">CPF</label>
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
                        <label htmlFor="phone">Telefone</label>
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
                        <label htmlFor="observation">Observação</label>
                    </div>

                    <button className="btn btn-info w-100 mt-2" type="submit">Cadastrar</button>
                </form>
            </main>
            <div className="mt-3 text-center">
                <Link className="link-info" to="/clients">Voltar</Link>
            </div>
        </>
    )
}

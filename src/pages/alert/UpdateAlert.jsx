import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import useAlert from "../../hooks/useAlert"
import useClient from "../../hooks/useClient"
import { dateForInput } from "../../helpers/general"

export const UpdateAlert = () => {
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()
    const { getAll } = useClient()
    const { update, getById } = useAlert()

    useEffect(() => {
        const loadData = async () => {
            const [clientsData, alertData] = await Promise.all([
                getAll(),
                getById(id)
            ])
            setClients(clientsData)
            setClientId(alertData.clientId)
            setDate(dateForInput(alertData.date))
            setDescription(alertData.description)
        }
        loadData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        update({ clientId, date, description }, id)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Atualizar Alerta</h3>

            <main className="m-auto form-production">
                <form onSubmit={handleSubmit}>
                    <div className="border rounded-2 p-3">

                        <div className="mb-3 row">
                            <label htmlFor="clientId" className="col-sm-2 col-form-label">Cliente</label>
                            <div className="col-sm-10">
                                <select className="form-select" id="clientId" name="clientId" value={clientId} onChange={e => setClientId(e.target.value)}>
                                    <option value="">Selecione</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col">
                            <div className="row">
                                <label htmlFor="date" className="col col-form-label pe-0">Data do Alerta</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control" name="date" value={date} onChange={e => setDate(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-1">
                            <label htmlFor="description" className="form-label">Descrição</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                    </div>

                    <button className="btn btn-info w-100 mt-3" type="submit">Atualizar</button>
                </form>
            </main>

            <div className="mt-3 text-center">
                <Link className="link-info" to="/alerts">Voltar</Link>
            </div>
        </>
    )
}

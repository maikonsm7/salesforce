import { useState, useEffect } from "react"
import { Link } from "react-router"
import useProduction from "../../hooks/useProduction"
import useClient from "../../hooks/useClient"
import MaskedMoney from "../../components/MaskedMoney"

export const CreateProduction = () => {
    const [clients, setClients] = useState([])
    const [production, setProduction] = useState({})
    const [consignado, setConsignado] = useState('')
    const [parcelado, setParcelado] = useState('')
    const [loading, setLoading] = useState(false)
    const { getAll: getAllClients } = useClient()
    const { create } = useProduction()

    useEffect(() => {
        const loadData = async () => {
            const data = await getAllClients()
            setClients(data)
        }
        loadData()
    }, [])

    const handleProduction = e => setProduction(prev => ({...prev, [e.target.name]: e.target.value}))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await create({...production, consignado, parcelado})
        setLoading(false)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Inserir Produção</h3>

            <main className="m-auto form-production">
                <form onSubmit={handleSubmit}>
                    <div className="border rounded-2 p-3">

                        <div className="mb-3 row">
                            <label htmlFor="clientId" className="col-sm-2 col-form-label">Cliente</label>
                            <div className="col-sm-10">
                                <select className="form-select" id="clientId" name="clientId" value={production.clientId || ''} onChange={handleProduction}>
                                    <option value="">Selecione</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="consignado" className="col col-form-label">Consignado</label>
                                    <div className="col-sm-6">
                                        <MaskedMoney 
                                        className={"form-control"} 
                                        id={"consignado"} 
                                        name={"consignado"} 
                                        value={consignado} 
                                        onChange={setConsignado} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="parcelado" className="col col-form-label">Créd. Parcel.</label>
                                    <div className="col-sm-6">
                                        <MaskedMoney 
                                        className={"form-control"} 
                                        id={"parcelado"} 
                                        name={"parcelado"} 
                                        value={parcelado} 
                                        onChange={setParcelado} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="conta" className="col col-form-label pe-0">Abert. de Conta</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="conta"
                                            name="conta"
                                            value={production.conta || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="cartao" className="col col-form-label">Cartão</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="cartao"
                                            name="cartao"
                                            value={production.cartao || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="lime" className="col col-form-label">Lime</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="lime"
                                            name="lime"
                                            value={production.lime || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="chess" className="col col-form-label pe-0">Cheque Espec.</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="chess"
                                            name="chess"
                                            value={production.chess || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="microsseguro" className="col col-form-label">Microsseguro</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="microsseguro"
                                            name="microsseguro"
                                            value={production.microsseguro || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label htmlFor="consorcio" className="col col-form-label pe-0">Consórcio</label>
                                    <div className="col-sm-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="consorcio"
                                            name="consorcio"
                                            value={production.consorcio || ''}
                                            onChange={handleProduction}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button className="btn btn-info w-100 mt-3" type="submit">{loading ? 'Inserindo...' : 'Inserir'}</button>
                </form>
            </main>
            <div className="mt-3 text-center">
                <Link className="link-info" to="/productions">Voltar</Link>
            </div>
        </>
    )
}

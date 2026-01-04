import { useState } from "react"
import { Link } from "react-router"
import useClient from "../../hooks/useClient"
import MaskedInput from "../../components/MaskedInput"
import { cleanString } from "../../helpers/general"

export const CreateClient = () => {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const { create } = useClient()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cleanCpf = cleanString(cpf)
        const cleanPhone = cleanString(phone)
        setLoading(true)
        await create({ name, cpf: cleanCpf, phone: cleanPhone })
        setLoading(false)
    }

    return (
        <>
            <h3 className="text-center fw-normal">Cadastrar Cliente</h3>

            <main className="m-auto form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className="form-floating">
                        <MaskedInput
                        type="text" 
                        name="cpf"
                        className="form-control"
                        placeholder="cpf" 
                        maxLength={14} 
                        mask="###.###.###-##" 
                        value={cpf} 
                        onChange={setCpf} 
                        />
                        <label htmlFor="cpf">CPF</label>
                    </div>

                    <div className="form-floating">
                        <MaskedInput
                        type="text" 
                        name="phone"
                        id="phone"
                        className="form-control" 
                        placeholder="phone"
                        maxLength={15} 
                        mask="(##) #####-####" 
                        value={phone} 
                        onChange={setPhone} 
                        />
                        <label htmlFor="phone">Telefone</label>
                    </div>

                    <button className="btn btn-info w-100 mt-2" type="submit">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                </form>
            </main>
            <div className="mt-3 text-center">
                <Link className="link-info" to="/clients">Voltar</Link>
            </div>
        </>
    )
}

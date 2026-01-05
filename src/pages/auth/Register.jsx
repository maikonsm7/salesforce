import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import MaskedInput from '../../components/MaskedInput'
import useAuth from '../../hooks/useAuth'
import { Message } from '../../components/Message'
import { cleanString } from '../../helpers/general'

export const Register = () => {
    const [name, setName] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        const newCnpj = cleanString(cnpj)
        const newPhone = cleanString(phone)
        try {
            setLoading(true)
            await register({ name, nameUser, cnpj: newCnpj, email, phone: newPhone })
            setName("")
            setNameUser("")
            setEmail("")
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <main className="form-container m-auto pb-0 pt-0">
                <Message />
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center mt-2 pb-2'>Cadastro</h3>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name">Nome da Empresa</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="nameUser"
                            placeholder="nameUser"
                            value={nameUser}
                            onChange={e => setNameUser(e.target.value)}
                        />
                        <label htmlFor="nameUser">Nome do usuário</label>
                    </div>

                    <div className="form-floating">
                        <MaskedInput
                            type="text"
                            name="cnpj"
                            className="form-control"
                            placeholder="cnpj"
                            maxLength={18}
                            mask="##.###.###/####-##"
                            value={cnpj}
                            onChange={setCnpj}
                        />
                        <label htmlFor="cnpj">CNPJ</label>
                    </div>

                    <div className="form-floating">
                        <MaskedInput
                            type="text"
                            name="phone"
                            placeholder="phone"
                            className="form-control"
                            maxLength={15}
                            mask="(##) #####-####"
                            value={phone}
                            onChange={setPhone}
                        />
                        <label htmlFor="phone">Telefone</label>
                    </div>

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
                    <button className="btn btn-info w-100 py-2" type="submit">
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
                <div className='text-center mt-4'>
                    <Link to='/' className='link-info'>Voltar</Link>
                </div>
                <Footer />
            </main>
        </>
    )
}
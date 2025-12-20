import { useState, useContext } from 'react'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import MaskedInput from '../../components/MaskedInput'
import { AuthContext } from '../../context/AuthContext'
import { Message } from '../../components/Message'

export const Register = () => {
    const [name, setName] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showpass, setShowPass] = useState(false)
    const { register } = useContext(AuthContext)

    const cleanString = txt => txt.replace(/[^a-zA-Z0-9]/g, '')

    const handleSubmit = async e => {
        e.preventDefault()
        const newCnpj = cleanString(cnpj)
        const newPhone = cleanString(phone)
        await register({name, cnpj: newCnpj, email, phone: newPhone, password})
    }
    return (
        <>
            <main className="form-container m-auto mt-4">
                <Message />
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Cadastro</h3>

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
                        <MaskedInput
                        type="text" 
                        name="cnpj"
                        className="form-control" 
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
                    <p className={`form-text ${password.length > 5 ? 'text-success' : 'text-danger'}`}><i className={`bi bi-${password.length > 5 ? 'check' : 'x'}`}></i> No mínimo 6 caracteres</p>
                    <button className="btn btn-info w-100 py-2" type="submit">
                        Enviar
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
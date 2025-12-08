import { useState } from 'react'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'

export const Recovery = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <>
            <main className="form-recovery w-100 m-auto mt-4">
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Recuperação de senha</h3>
                    <div className='form-text mt-3'>
                        Digite seu email no campo abaixo para que seja enviado link de recuperação de senha.
                    </div>
                    <div className="form-floating mt-3">
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
                    
                    <button className="btn btn-info w-100 py-2 mt-3" type="submit">
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
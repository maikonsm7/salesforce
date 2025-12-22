import useAuth from "../../hooks/useAuth"
export const Home = () => {
    const { user } = useAuth()   
    return(
        <>
        <div className="text-center mt-5">
        <h2 className="fw-normal">{user.company.name || ''}</h2>
        <p className="form-text">Bem vindo!</p>
        </div>
        </>
    )
}
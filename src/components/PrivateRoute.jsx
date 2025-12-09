    import { useContext } from "react"
    import { AuthContext } from "../context/AuthContext"
    import { Navigate, Outlet } from "react-router-dom"

    export const PrivateRoute = () => {
        const { user, loading } = useContext(AuthContext)

        if (loading) {
            return (<></>)
        }

        return user ? <Outlet /> : <Navigate to="/" replace />
    }

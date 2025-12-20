    import useAuth from "../hooks/useAuth"
    import { Navigate, Outlet } from "react-router-dom"
    
    export const PrivateRoute = () => {
        const { user, loading } = useAuth()

        if (loading) {
            return (<></>)
        }

        return user ? <Outlet /> : <Navigate to="/" replace />
    }

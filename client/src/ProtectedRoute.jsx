import { Navigate , Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react"

const ProtectedRoute = () => {
    const {isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated){
          navigate('/login')
        }
      }, [isAuthenticated])

  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute

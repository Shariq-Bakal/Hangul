import {useAuth} from "../contexts/AuthContext"
import {Navigate} from "react-router-dom"
 
const RequiresAuth = ({children}) => {
    const { authState : {authStatus}} = useAuth();
    
  return (
    authStatus ? children  : <Navigate to = "/login" />
  )
}

export default RequiresAuth
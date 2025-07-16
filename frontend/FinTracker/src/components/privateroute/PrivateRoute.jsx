import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) =>{

    const user = useSelector(store=>store.user)
    return user?children:<Navigate to="/auth"/>
}

export default PrivateRoute
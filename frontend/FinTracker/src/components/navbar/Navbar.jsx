import { useEffect, useState } from "react"

import { Link,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { removeUser } from "../../utils/userSlice"
import Cookies from 'js-cookie'

import axios from "axios"
import { BASE_URL } from "../../utils/constant"


const Navbar = () =>{
    
    const [isCookie, setIsCookie] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(store=>store.user)    
    const dispatch = useDispatch()


    const signOff = async()=>{
        axios.post(BASE_URL+"/logout",{withCredentials:true})
        dispatch(removeUser())
        navigate('/')
    }
    useEffect(()=>{
        const checkCookie = Cookies.get('token')
        if(!checkCookie){
            dispatch(removeUser())
        }
        else{
            navigate("/dashboard")
        }
        setIsCookie(checkCookie)
    },[isCookie])

    return(
        <div className="h-[10%] w-full px-5 border-black flex items-center justify-between">
            <div className="w-[13%] flex items-center justify-evenly text-xl font-bold">
                <img className="h-[50px] w-[50px]" src="https://static.thenounproject.com/png/7726630-200.png" alt="finance_logo"/>
                <h2>FinTracker</h2>
            </div>
            <ul className="w-[50vh] lg:w-[600px] md:text-sm lg:text-lg font-semibold hidden md:flex items-center justify-around">
                <Link to={user ?'/dashboard':''}><li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">{user?"Dashboard":"Pricing"}</li></Link>
                <Link to={user?'/transaction':''}><li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">{user?"Transaction":"Feature"}</li></Link>
                <Link to={user?'/budget':''}><li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">{user?"Budget":"Support"}</li></Link>
                {
                    user?<button className="py-2 px-4 rounded-full bg-blue-500 text-white" onClick={signOff}>Sign Off</button>:
                    <Link to="/auth"><li className="py-2 px-4 rounded-full bg-blue-500 text-white">Welcome</li></Link>
                }
            </ul>
        </div>
    )
}

export default Navbar
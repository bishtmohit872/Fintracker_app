import { useState,useEffect } from "react"
import { BASE_URL } from "../../utils/constant"
import axios from "axios"
import { useSelector } from "react-redux"

import Balances from "./DashboardComponents/Balances"


const Dashboard = () =>{
    const user = useSelector(store=>store.user)
    return(
        <div className="h-[90%] w-full pt-2 px-10 flex flex-col border-0 border-black ">
            <p className="text-4xl font-bold">Dashboard</p>
            <p className="text-gray-500">Welcome, {user?.emailId}</p>
            <Balances/>
        </div>     
    )
}

export default Dashboard
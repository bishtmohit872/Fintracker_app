import { useState,useEffect } from "react"
import { useSelector } from "react-redux"

import Balances from "./DashboardComponents/Balances"
import RecentTransaction from "./DashboardComponents/RecentTransactions"
import SpendingByCategory from "./DashboardComponents/SpendingByCategory"
import axios from "axios"


const Dashboard = () =>{
    const [email,setEmail] = useState("")
    const user = useSelector(store=>store.user)

    useEffect(()=>{
        setEmail(user?.emailId)
    },[user])
    return(
        <div className="h-[90%] w-full pt-1 px-10 lg:px-20 flex flex-col">
            <p className="text-4xl font-bold">Dashboard</p>
            <p className="text-gray-500">Welcome, {email}</p>
            <Balances/>
            <RecentTransaction/>
            <SpendingByCategory/>
        </div>     
    )
}

export default Dashboard
import { BASE_URL } from "../utils/constant"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addRecentTransaction,removeRecentTransaction } from "../utils/recentTransactionSlice"
import { useEffect } from "react"

const fetchRecentTransaction = async () =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        getRecentTransaction()
    },[])

    const getRecentTransaction = async() =>{
        const res = await axios.get(BASE_URL+"/api/transaction/all",{withCredentials:true})
        dispatch(addRecentTransaction(res?.data?.data))
    }
}

export default fetchRecentTransaction
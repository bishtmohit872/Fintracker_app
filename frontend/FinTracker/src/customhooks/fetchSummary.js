import { useEffect } from "react"
import { useImperativeHandle } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addSummary,removeSummary } from "../utils/summarySlice" 
import axios from "axios"

export const fetchSummary = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        getSummary()
    },[]) 

    const getSummary = async ()=>{
        const res = await axios.get(BASE_URL+"/api/transaction/summary",{withCredentials:true}) 
        dispatch(addSummary(res?.data))
        // console.log(res?.data)
    }

}
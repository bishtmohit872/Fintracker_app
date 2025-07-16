import { useEffect } from "react"
import { BASE_URL } from "../utils/constant"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addSpendingCategory,removeSpendingCategory } from "../utils/spendingCategorySlice"


export const fetchSpendingCategory = () =>{
    const dispatch = useDispatch()

    useEffect(()=>{
        getSpendingCategory()
    },[])

    const getSpendingCategory = async ()=>{
        const res = await axios.get(BASE_URL+"/api/transaction/stats",{withCredentials:true})
        dispatch(addSpendingCategory(res?.data))
        // console.log(res?.data)
    }
}
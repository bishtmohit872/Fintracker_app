import { useEffect } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addSummary, removeSummary } from "../utils/summarySlice"
import axios from "axios"

export const fetchSummary = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getSummary = async () => {
            try{

                const res = await axios.get(BASE_URL + "/api/transaction/summary", { withCredentials: true })
                dispatch(addSummary(res?.data))
            }
            catch(err){
                console.error('error in summary api:',err)
            }
        }
        getSummary()
    }, [])

}
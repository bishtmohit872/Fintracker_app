import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../utils/constant"

const NewTransaction = ({show,handleShow,updateFlag,fieldValues}) => {

    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [type,setType] = useState("")
    const [amount,setAmount] = useState(0)

    useEffect(()=>{
       if(updateFlag){
        setDescription(fieldValues.d)
        setCategory(fieldValues.c)
        setType(fieldValues.t)
        setAmount(fieldValues.a)
       } 
    },[updateFlag])
    
    const handleCancel = ()=>{
        handleShow()
    }

    const handleSubmit = async()=>{
        const res = await axios.post(BASE_URL+"/api/transaction/add/",{description,amount,type,category},{withCredentials:true})
        console.log(res)
        alert(res.message)
    }

    const handleUpdate = async() =>{
        const res = await axios.patch(BASE_URL+`/api/transaction/${fieldValues.id}`,{description,category,type,amount},{withCredentials:true})
        console.log(res.message)
        alert(res.message)
    }

    const handleDelete = async()=>{
        const res = await axios.delete(BASE_URL+`/api/transaction/${fieldValues.id}`,{withCredentials:true})
        alert(res.message)
    }

    return (
        <div className={`h-[75%] w-[95%] md:w-[700px] py-4 px-4 rounded-xl border-black ${show?'flex':'hidden'} flex-col items-center justify-center absolute bg-gray-200`}>
            <p className="text-4xl font-semibold font-mono flex flex-col items-center text-gray-800">{updateFlag?"Update Transaction":"New Transaction"}</p>
            
            <form className="h-[70%] w-full mt-10 p-4 flex flex-col justify-between">

                <div className="flex flex-col">
                    <label className="text-xl text-gray-700 mb-2 font-semibold">Description</label>
                    <input className="p-2 rounded-lg outline-blue-400 bg-gray-300" type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Where did you spend the money?"></input>
                </div>

                <div className="flex flex-col">
                    <label className="text-xl text-gray-700 mb-2 font-semibold">Category</label>
                    <input className="p-2 rounded-lg outline-blue-400 bg-gray-300" type='text' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="purpose for transacton"></input>
                </div>

                <div className="flex flex-col">
                    <label className="text-xl text-gray-700 mb-2 font-semibold">Type</label>
                    <input className="p-2 rounded-lg outline-blue-400 bg-gray-300" type='text' value={type} onChange={(e)=>{setType(e.target.value)}} placeholder="Income or Expense"></input>
                </div>

                <div className="flex flex-col">
                    <label className="text-xl text-gray-700 mb-2 font-semibold">Amount</label>
                    <input className="p-2 rounded-lg outline-blue-400 bg-gray-300" type='number' value={amount} onChange={(e)=>{setAmount(e.target.value)}} placeholder="Enter Amount"></input>
                </div>

                <div className="w-[150px] flex justify-between py-2">
                    <button className="py-1 px-2 border-2 rounded-md bg-green-400 text-white" type="submit" onClick={updateFlag?handleUpdate:handleSubmit}>{updateFlag?"Update":"Submit"}</button>
                    <button className="py-1 px-2 border-2 rounded-md bg-blue-400 text-white" onClick={handleCancel}>Cancel</button>
                    {
                        updateFlag?(<button className="py-1 px-2 border-2 rounded-md bg-red-400 text-white" onClick={handleDelete}>Delete</button>):""
                    }
                </div>

            </form>
        </div>
    )
}
export default NewTransaction
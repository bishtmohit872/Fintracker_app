import { useSelector } from "react-redux"
import { fetchSummary } from "../../../customhooks/fetchSummary"

const Balances = () =>{
    const transactionSummary = useSelector(store=>store.summary)
    fetchSummary()
    console.log(typeof(transactionSummary))
    console.log(transactionSummary)
    return(
        <div className="h-[20%] w-full flex flex-col items-start justify-evenly">
            <p className="text-2xl font-bold">Account Balances</p>
            <div className="h-[60%] w-full mt-4 flex justify-start">
                {
                    Array.isArray(transactionSummary)?
                    transactionSummary?.map((transaction)=>(
                        <div key={transaction._id} className="h-full w-[200px] mr-4 p-4 flex flex-col items-start justify-center border-[1px] border-gray-400 rounded-lg capitalize">
                            <p className="text-2xl font-bold">{transaction._id}</p>
                            <p>₹{transaction['Total Cost']}</p>
                        </div>
                    )):""
                }
            </div>
        </div>
    )
}

export default Balances
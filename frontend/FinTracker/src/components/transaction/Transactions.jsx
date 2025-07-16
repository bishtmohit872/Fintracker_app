import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchRecentTransaction from "../../customhooks/fetchRecentTransaction"
import NewTransaction from "./NewTransaction"

const Transaction = () => {

    const [date,setDate] = useState("")
    const [category,setCategory] = useState("")
    const [amount, setAmount] = useState("")

    const [visible,setVisible] = useState(false)
    const [update,setUpdate] = useState(false)
    const [id,setId] = useState("")
    const [d,setD] = useState("")
    const [c,setC] = useState("")
    const [t,setT] = useState("")
    const [a,setA] = useState(0)

    const [filteredData,setFilteredData] = useState([])
    const RecentTransactions = useSelector(store => store.recentTransaction)
    fetchRecentTransaction()


    const handleSearch = ()=>{
        
        let result=[...RecentTransactions]
        if(date){
            const filterByDate = RecentTransactions.filter((t)=>{
                return new Date(t?.createdAt).toLocaleDateString("en-IN").toString()==date.toString()
            })
            result=[...filterByDate]
        }
        if(category){
            const source = date?result:RecentTransactions
            const filterByCategory = source.filter((t)=>{
                return t?.category.toString()==category.toString()
            })
            result=[...filterByCategory]
        }
        if(amount){
            const source = category?result:(date?result:RecentTransactions)
            const filterByAmount = source.filter((t)=>{
                return t?.amount.toString()==amount.toString()
            })
            result=[...filterByAmount]
        }
        setFilteredData([...result])
    }

    const showNewTransaction=()=>{
        setVisible(!visible)
    }

    const handleReset = () =>{
        setDate("Date")
        setCategory("Description")
        setAmount("Amount")
        setFilteredData(RecentTransactions)
        window.location.reload()
    }

    const handleUpdate=(id,d,c,t,a)=>{
        setId(id)
        setD(d)
        setC(c)
        setT(t)
        setA(a)
        setUpdate(true)
        setVisible(!visible)
    }

    useEffect(()=>{
        setFilteredData(RecentTransactions)
    },[RecentTransactions])

    return (
        <div className="h-[100%] w-full flex flex-col border-0 items-center px-6 py-2 relative">

            <div className="h-[40px] w-full md:w-[700px] mb-2 flex items-center justify-between">
                <p className="font-bold text-2xl">Transactions</p>
                <button className="p-2 bg-gray-200 rounded-md font-semibold hover:bg-black hover:text-white" onClick={showNewTransaction}>New Transaction</button>
            </div>

            <NewTransaction show={visible} handleShow={setVisible} updateFlag={update} fieldValues={{id,d,c,t,a}}/>

            {/* <div className="h-[40px] w-full md:w-[700px] flex items-center border-2 bg-gray-200 rounded-md p-4 outline-none">
                <img className='h-[30px] w-[30px]' src="https://static.thenounproject.com/png/337700-200.png" alt="search_icon" />
                <input className="h-[40px] w-full md:w-[800px] border-2 bg-gray-200 rounded-md p-4 outline-none" type="text" placeholder="Search By Description"></input>
            </div> */}

            {/* <div className="h-[90px] sm:h-[40px] w-[440px] sm:w-full md:w-[500px] md:relative md:right-[100px] border-2 mt-2 flex flex-wrap items-center justify-between outline-none"> */}
            <div className="h-[60px] w-full sm:w-[450px] flex flex-wrap justify-between items-center border-black">
                
                <select className="h-[35px] w-[80px] p-1 bg-gray-200 rounded-md border border-gray-200 focus:outline-none focus:ring-0" name="date" id="date" onChange={e=>setDate(e.target.value)}>

                    <option value="date" hidden>Date</option>
                    {  
                        [...new Set(RecentTransactions?.map(t => new Date(t?.createdAt).toLocaleDateString("en-IN")))]?.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))   
                    }

                </select>

                <select className="h-[35px] w-[100px] p-1 bg-gray-200 rounded-md border border-gray-200 focus:outline-none focus:ring-0" name="date" id="date" onChange={e=>setCategory(e.target.value)}>

                    <option value="Category" hidden>Category</option>
                    {
                        [...new Set(RecentTransactions?.map(t => t?.category))]?.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }

                </select>

                <select className="h-[35px] w-[100px] p-1 bg-gray-200 rounded-md border border-gray-200 focus:outline-none focus:ring-0" name="date" id="date" onChange={e=>setAmount(e.target.value)}>

                    <option value="Amount" hidden>Amount</option>
                    {
                        [...new Set(RecentTransactions?.map(t => t?.amount))]?.map((amount, index) => (
                            <option key={index} value={amount}>₹{amount}</option>
                        ))
                    }

                </select>

                <button className="h-[35px] w-[80px] rounded-md flex items-center justify-evenly bg-gray-200 hover:bg-gray-400" onClick={handleSearch}>
                    <img className='h-[20px] w-[20px]' src="https://static.thenounproject.com/png/1868256-200.png" alt="search_icon" />
                    <p>Filter</p>
                </button>

                <button className="h-[35px] w-[60px] px-2 rounded-md flex items-center justify-evenly bg-gray-200 hover:bg-gray-600 hover:text-white" onClick={handleReset}>
                    <p>Reset</p>
                </button>
            
            </div>

            <div className="h-max w-full md:w-[700px] mt-4 flex flex-col items-start justify-evenly border-2 rounded-lg overflow-y-auto">
                <table className="h-full w-full text-left" border="1">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 sm:px-6">Date</th>
                            <th className="p-2 sm:px-6">Description</th>
                            <th className="p-2 sm:px-6">Category</th>
                            <th className="p-2 sm:px-6">Type</th>
                            <th className="p-2 sm:px-6">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            filteredData?.map((transaction, index) => (
                                <tr key={transaction._id} className="h-[10px] hover:bg-gray-50 border-b-[1px]" onClick={()=>{handleUpdate(transaction._id,transaction?.description,transaction?.category,transaction?.type,transaction?.amount)}}>
                                    <td className="px-2 py-4 text-md sm:px-6 sm:p-1 sm:text-lg lg:p-4">{new Date(transaction?.createdAt).toLocaleDateString("en-IN")}</td>
                                    <td className="px-2 py-4 text-md sm:px-6 sm:p-1 sm:text-lg lg:p-4">{transaction?.description}</td>
                                    <td className="px-2 py-4 text-md sm:px-6 sm:p-1 sm:text-lg lg:p-4 capitalize">{transaction?.category}</td>
                                    <td className="px-2 py-4 text-sm sm:px-6 sm:p-1 sm:text-lg lg:p-4 capitalize">{transaction?.type}</td>
                                    <td className="px-2 py-4 text-sm sm:px-6 sm:p-1 sm:text-lg lg:p-4">₹{transaction?.amount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Transaction
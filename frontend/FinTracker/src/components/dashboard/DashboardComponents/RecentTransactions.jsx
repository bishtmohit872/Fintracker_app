import { useSelector } from "react-redux"
import fetchRecentTransaction from "../../../customhooks/fetchRecentTransaction"

const RecentTransaction = () => {

    const RecentTransactions = useSelector(store=> store.recentTransaction)
    fetchRecentTransaction()

    return (
        <div className="h-[42%] mt-4 w-full flex flex-col items-start justify-evenly">
            <p className="mb-4 text-2xl font-bold">Recent Transactions</p>

            <table className="h-full w-full border border-gray-300 text-left" border="1">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3">Date</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RecentTransactions?.map((transaction,index) => (
                            (index<5)?(
                                <tr key={transaction._id} className="hover:bg-gray-50 border-t-[1px]">
                                <td className="px-2 text-sm sm:p-2 sm:text-lg">{new Date(transaction?.createdAt).toLocaleDateString("en-IN")}</td>
                                <td className="px-2 text-sm sm:p-2 sm:text-lg">{transaction?.description}</td>
                                <td className="px-2 text-sm sm:p-2 sm:text-lg capitalize hover:bg-gray-200">{transaction?.category}</td>
                                <td className="px-2 text-sm sm:p-2 sm:text-lg">₹{transaction?.amount}</td>
                                </tr>
                            ):""
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RecentTransaction

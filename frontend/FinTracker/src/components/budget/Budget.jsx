import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpendingByCategory from "../dashboard/DashboardComponents/SpendingByCategory"

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
// Register components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


const Budget = () => {

    const [incomeAmountLabel, setIncomeAmountLabel] = useState([])
    const [incomeDateLabel, setIncomeDateLabel] = useState([])
    const [incomeCategoryLabel, setIncomeCategoryLabel] = useState([])

    const [expenseAmountLabel, setExpenseAmountLabel] = useState([])
    const [expenseDateLabel, setExpenseDateLabel] = useState([])
    const [expenseCategoryLabel, setExpenseCategoryLabel] = useState([])

    const RecentTransactions = useSelector(store => store.recentTransaction)

    const getMonthName = (dateString) => {
        const dateObj = new Date(dateString);
        const monthNumber = dateObj.getMonth();
        dateObj.setMonth(monthNumber); // 0-based indexing
        return dateObj.toLocaleString('default', { month: 'long' });
    };

    useEffect(() => {
        let income = []
        let expense = []
        RecentTransactions?.filter((t) => {
            if (t.type == "income") {
                income.push(t)
            }
            else if (t.type == "expense") {
                expense.push(t)
            }
        })


        let incomeAmount = income?.map((t) => {
            return t.amount
        })
        let incomeDate = income?.map((t) => {
            return getMonthName(t.createdAt)
        })
        let incomeCategory = income?.map((t) => {
            return t.category
        })


        let expenseAmount = expense?.map((t) => {
            return t.amount
        })
        let expenseDate = expense?.map((t) => {
            return getMonthName(t.createdAt)
        })
        let expenseCategory = expense?.map((t) => {
            return t.category
        })

        setIncomeAmountLabel(incomeAmount)
        setIncomeDateLabel(incomeDate)
        setIncomeCategoryLabel(incomeCategory)

        setExpenseAmountLabel(expenseAmount)
        setExpenseDateLabel(expenseDate)
        setExpenseCategoryLabel(expenseCategory)

    }, [])

    const barData1 = {
        labels: incomeDateLabel,
        datasets: [
            {
                label: `Expense in Month`,
                data: incomeAmountLabel,
                backgroundColor: "#899499",
            },
        ],
    };

    const barOptions1 = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const index = context.dataIndex;
                        const category = incomeCategoryLabel[index];
                        return `Category: ${category}`;
                    },
                },
            },
        },
    };

    const barData2 = {
        labels: expenseDateLabel,
        datasets: [
            {
                label: `Expense in Month`,
                data: expenseAmountLabel,
                backgroundColor: "#899499",
            },
        ],
    };

    const barOptions2 = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const index = context.dataIndex;
                        const category = expenseCategoryLabel[index];
                        return `Category: ${category}`;
                    },
                },
            },
        },
    };


    return (
        <div className="h-[90%] w-full pl-4 border-black flex flex-col justify-start">
            <SpendingByCategory />
            <div className="h-[42%] w-[80%] py-5 flex flex-col items-start justify-evenly">
                <p className="text-2xl font-bold">Income Graph</p>
                <Bar data={barData1} options={barOptions1} />
            </div>

            <div className="h-[42%] w-[80%] py-5 flex flex-col items-start justify-evenly">
                <p className="text-2xl font-bold">Expense Graph</p>
                <Bar data={barData2} options={barOptions2} />
            </div>
        </div>
    )
}
export default Budget
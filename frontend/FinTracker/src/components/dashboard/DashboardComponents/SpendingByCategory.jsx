import { useEffect, useState } from "react";
import { fetchSpendingCategory } from "../../../customhooks/fetchSpendingCategory";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


const SpendingByCategory = () => {

  const [yLabel, setYLabel] = useState([])
  const [category, setCategory] = useState([])

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // 0-based indexing
    return date.toLocaleString('default', { month: 'long' });
  };

  // console.log(getMonthName(6)); // June


  const spendingByCategory = useSelector(store => store.spendingCategory)
  fetchSpendingCategory() 

  const costs = spendingByCategory?.category.map((items) => items.Cost * items.count)
  const items = spendingByCategory?.category.map((items) => items._id)
  const month = getMonthName(spendingByCategory?.time[0]?._id?.month)

  useEffect(() => {
    setYLabel(costs)
    setCategory(items)
  }, [spendingByCategory])



  const barData = {
    labels: category,
    datasets: [
      {
        label: `Expense of ${month} Month`,
        data: yLabel,
        backgroundColor: "#899499",
      },
    ],
  };

  return (
    <div className="h-[42%] w-full py-5 flex flex-col items-start justify-evenly">
      <p className="text-2xl font-bold">Spending By Category</p>
      <Bar data={barData} />
    </div>
  )
}

export default SpendingByCategory

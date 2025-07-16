import Navbar from "../navbar/Navbar"
import { Outlet, useLocation } from "react-router-dom"

const Body = () => {
    const location = useLocation()
    const curr_path = location.pathname === "/"

    return (
        <div className="h-full w-full">
            <Navbar />
            {
                curr_path?(
                        <div className="h-[90%] w-full py-4 px-8 flex flex-col items-center gap-4 overflow-y-scroll">

                            <div className="h-[500px] w-full lg:w-[950px] py-20 px-10 flex flex-col items-center justify-center flex-shrink-0 rounded-2xl text-white bg-[url('https://plus.unsplash.com/premium_photo-1675342786681-e33a19414cfd?q=80&w=1190&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
                                <p className="text-4xl lg:text-6xl font-semibold">Take Control of Your Finance</p>
                                <p className="mt-10 text-md lg:text-xl lg:text-center font-sans">Our Finance Tracker apps helps you manage your money effectively, track your expenses, and achieve your financial goals. sign up today to start your journey towards financial freedom.</p>
                            </div>

                            <div className="lg:h-[90%] w-full flex flex-col items-center lg:flex-row lg:justify-center gap-6 lg:gap-10 lg:overflow-y-hidden">

                                <div className="h-[510px] lg:h-[260px] lg:w-[290px] border-0 border-black w-full flex flex-col flex-shrink-0 rounded-2xl text-black bg-gray-200 shadow-2xl shadow-gray-500">
                                    <img className="h-[60%] lg:h-[60%] w-full rounded-2xl object-cover" src="https://image.lexica.art/full_webp/054f3f1a-14ec-4aa5-b5da-b0513831d276" alt="" />
                                    <p className="mt-4 lg:mt-2 px-2 text-4xl lg:text-xl font-semibold text-left">Track Your Spending</p>
                                    <p className="mt-4 lg:mt-2 px-2 text-md font-sans">Easily Monitor your expenses and understand where your money goes.</p>
                                </div>

                                <div className="h-[510px] lg:h-[260px] lg:w-[290px] border-0 border-black w-full flex flex-col flex-shrink-0 rounded-2xl text-black bg-gray-100 shadow-2xl shadow-gray-500">
                                    <img className="h-[60%] lg:h-[60%] w-full rounded-2xl object-cover" src="https://image.lexica.art/full_webp/cd967b28-c3e0-4c18-8ecb-2dd39d177f40" alt="" />
                                    <p className="mt-4 lg:mt-2 px-2 text-4xl lg:text-xl font-semibold text-left">Set Financial Goals</p>
                                    <p className="mt-4 lg:mt-2 px-2 text-md font-sans">Create personalized budgets and savings targets to stay on track.</p>
                                </div>

                                <div className="h-[510px] lg:h-[260px] lg:w-[290px] border-0 border-black w-full flex flex-col flex-shrink-0 rounded-2xl text-black bg-gray-100 shadow-2xl shadow-gray-500">
                                    <img className="h-[60%] lg:h-[60%] w-full rounded-2xl object-cover" src="https://image.lexica.art/full_webp/3d91b317-c132-41cf-986a-a64d001c7fa0" alt="" />
                                    <p className="mt-4 lg:mt-2 px-2 text-4xl lg:text-xl font-semibold text-left">Achieve Financial Freedom</p>
                                    <p className="mt-4 lg:mt-2 px-2 text-md font-sans">Take control of your finances and build a secure future.</p>
                                </div>

                            </div>
                        </div>
                    ) : <Outlet />
            }
        </div>
    )
}

export default Body
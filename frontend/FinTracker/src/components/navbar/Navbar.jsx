import { Link } from "react-router-dom"

const Navbar = () =>{
    return(
        <div className="h-[10%] w-full px-10 border-black flex items-center justify-between">
            <div className="w-[13%] flex items-center justify-evenly text-xl font-bold">
                <img className="h-[50px] w-[50px]" src="https://static.thenounproject.com/png/7726630-200.png" alt="finance_logo"/>
                <h2>FinTracker</h2>
            </div>
            <ul className="w-[50vh] lg:w-[600px] md:text-sm lg:text-lg font-semibold hidden md:flex items-center justify-around">
                <li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">Feature</li>
                <li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">Pricing</li>
                <li className="px-4 py-2 hover:bg-black hover:text-white hover:rounded-md cursor-pointer">Support</li>
                <Link to="/auth"><li className="py-2 px-4 rounded-full bg-blue-500 text-white">Welcome</li></Link>
            </ul>
        </div>
    )
}

export default Navbar
import React,{ useState,useEffect } from 'react'
import { BASE_URL } from '../../utils/constant';
import axios from 'axios';

import { useDispatch} from 'react-redux';
import {addUser,removeUser} from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

  const [isLogIn,setIsLogIn] = useState(false);

  const [emailId,setEmailId] = useState("")
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")
  
  const [showToast,setShowToast] = useState(false)
  const [toastType,setToastType] = useState(false)  //true==>green, false==>red
  const [toastMessage,setToastMessage] = useState("")


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const toggleLogInSignIn=()=>{
    const state = !isLogIn
    setIsLogIn(state)
  }

  const handleSignUp=async()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{emailId,password,confirmpassword},{withCredentials:true})

      if(typeof(res.data)=="object"){
        setToastType(true)
        setToastMessage("Registered Successfully")
        setShowToast(true)
      }
      else{
        throw new Error(res.data)
      }
      
    }
    catch(err){
      console.log("something went wrong: "+err.message)
      setToastType(false)
      setToastMessage(err.message)
      setShowToast(true)
    }
  }
  
  const handleLogIn=async()=>{
    try{
      
      const res = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
      // dispatch(addUser(res?.data))
      if(typeof(res.data)=="object"){
        setToastType(true)
        setToastMessage("Login Successfull !")
        setShowToast(true)
        dispatch(addUser(res?.data?.data))

        navigate("/dashboard")
      }
      else{
        throw new Error(res.data)
      }
      
    }
    catch(err){
      setToastType(false)
      setToastMessage(err.message)
      setShowToast(true)
    }

  }

  useEffect(()=>{
    if(showToast){
      const timer = setTimeout(()=>{
        setShowToast(false)
      },3000) 
      // console.log("toast running")

      return ()=>{
        clearTimeout(timer)
      }
    }
  },[showToast])

  
  return (
    <div className='h-[90%] w-full flex flex-col items-center justify-center filter contrast-125 bg-gray-300 relative'>

      {/* this is toast modal for error representation */}
      <div className={`h-max w-[390px] p-2 text-center text-lg absolute top-6 left-[50%] translate-x-[-50%] rounded-md ${toastType?'bg-green-600 text-white':'bg-red-400'} transition-opacity ${showToast?'opacity-100':'opacity-0'} duration-500`}>
        <p>{toastMessage}</p>
      </div>
      
      <div className="h-[60%] w-[390px] mt-2 text-lg flex flex-col items-center justify-evenly font-sans bg-white rounded-xl bg-opacity-40">
        
        {
          isLogIn?
          (<img className="h-[100px] [w-100px]" src="https://cdn-icons-png.flaticon.com/128/924/924915.png" alt="user image"></img>):
          (	<img className="h-[100px] [w-100px]" src="	https://cdn-icons-png.flaticon.com/128/4140/4140061.png" alt="user image"></img>)
        }

        <div className='h-[50px] w-[340px] flex flex-col items-start justify-between font-serif '>
          <label className='text-gray-600'>Email Id</label>
          <input className="w-full outline-none p-2 bg-transparent border-gray-400 border-[1px] rounded-md" type="text" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder='Email Id'></input>
        </div>

        <div className='h-[50px] w-[340px] flex flex-col items-start justify-between font-serif'>
          <label className='text-gray-600'>Password</label>
          <input className="w-full outline-none p-2 bg-transparent border-gray-400 border-[1px] rounded-md" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'></input>
        </div>

        {
          isLogIn?(<div className='h-[50px] w-[340px] flex flex-col items-start justify-between font-serif'>
            <label>Confirm Password:</label>
            <input className="w-full outline-none p-2 bg-transparent border-gray-400 border-[1px] rounded-md"type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Confirm password'></input>
          </div>):""
        }
        
        {
          isLogIn?
          <button className="w-[85%] mt-2 px-4 py-2 bg-black rounded-md text-white duration-700 hover:bg-gray-600 hover:duration-700" type="submit" onClick={handleSignUp}>Sign Up</button>:
          <button className="w-[85%] mt-2 px-4 py-2 bg-black rounded-md text-white hover:bg-gray-600 duration-700 hover:duration-700" type="submit" onClick={handleLogIn}>Log In</button>
        }

      </div>

      <div className='h-[50px] w-[390px] mt-4 flex items-center justify-around text-xl rounded-lg border-1 bg-white'>
        <p>{isLogIn?"Already a User?":"New User ?"}</p>
        <button className={`px-3 py-1 rounded-md bg-opacity-80 bg-black text-white`} onClick={toggleLogInSignIn}>{isLogIn?"Login":"Signup"}</button>
      </div>

    </div>
  )
}

export default SignupPage
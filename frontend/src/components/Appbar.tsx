
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import '../App.css'
import { useEffect } from "react"


import { loghook } from "../hooks"

export const Appbar=()=>{
    const {logged,logOut,Login,logtrue}=loghook()
    
   useEffect( ()=>{
    if(localStorage.getItem("token")){
        logtrue()
        return
    }
    },[logged])
    
    return <div className="flex font-serif justify-between  px-10 py-2 border-b ">
     
        <div className="flex flex-col justify-center bg-slate-800 text-white p-2 rounded-md px-3">
            <Link to="/blogs">Home</Link>
        </div>
        
        <div className=" flex flex-row items-center">
        
            <Link to="/publish " className="" >  <button className="mx-8 border border-green-900 bg-opacity-80 text-white flex py-1.5 text-lg font-semibold justify-center  bg-green-500   hover:shadow-xl transition-all  rounded-md px-4 ">Create</button></Link>
        
        <div >
            <Avatar size={"big"} name="harkirat"></Avatar>
        </div>
        <div className="mx-2 flex bg-slate-800 p-2 text-white rounded-md ">
            <button onClick={logged ?  logOut:Login} > {logged? "Logout":"Login"}</button>
        </div>
            
        </div>
    </div>

}
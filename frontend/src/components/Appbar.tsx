
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { backend_url } from "../config"
export const Appbar=()=>{
    const [logged,setlogged]=useState(false)
    const navigate=useNavigate()
   useEffect( ()=>{
    async function getvalid() {
        const valid=await axios.get(`${backend_url}/api/v1/blog/checklogin`) 
        if(valid){
            setlogged(true)
            return
        }
        setlogged(false)
        return
    }
    getvalid()
    
    },[])
    
    return <div className="flex justify-between px-10 py-2 border-b">
     
        <div className="flex flex-col justify-center bg-slate-800 text-white p-2 rounded-md px-3">
            <Link to="/blogs">Home</Link>
        </div>
        
        <div className=" flex ">
        <div className="mx-8 flex flex-col justify-center bg-green-500 p-1 rounded-md px-5">
            <Link to="/publish">New</Link>
        </div>
        <div >
        <Avatar size={"big"} name="harkirat"></Avatar>
        </div>
        <div className="mx-2 flex bg-slate-800 p-2 text-white rounded-md ">
            <button onClick={()=>localStorage.clear()}>loout</button>
            
        </div>
            
        </div>
    </div>

}
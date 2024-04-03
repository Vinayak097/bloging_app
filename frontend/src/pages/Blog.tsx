import { useBlogs } from "../hooks"
import { backend_url } from "../config"
import axios from "axios"
import { useEffect, useState } from "react"
export const Blog=()=>{
    const [blogs,setBlog]=useState({})
    const fetchblog=()=>{
        axios.get(`${backend_url}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setBlog(blog);
        })
    }
    return <div className="p-2 ">
        <button className="p-2 bg-green-400" onClick={()=>{fetchblog()}}>getblog</button>
        <div>
            Blogs
            <div>
           
            </div>
        </div>
    </div>
}
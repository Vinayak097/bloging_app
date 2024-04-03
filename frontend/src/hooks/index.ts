import axios from "axios";
import { useEffect, useState } from "react"
import { backend_url } from "../config";

interface Blog{
    "content":string,
    "title":string,
    "id":number,
    "author":{
        "name":string
    }
}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${backend_url}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            const array=response.data.blogs
            setBlogs(array);
            setLoading(false)
        })
    },[])
    return{
        loading,
        blogs
    }
}
import axios from "axios";
import { useEffect, useState } from "react"
import { backend_url } from "../config";
import { useNavigate } from "react-router-dom";

interface Blogs{
    content:string,
    title:string,
    id:number,
    author:{
        name:string
    }
}

export interface Blog {

    content: string;
    title: string;
    author: {
      name: string;
    };
  }
  
  export const useBlog = (id:string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
  
    useEffect(() => {
      axios.get(`${backend_url}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || " "
        }
      })
      .then((response) => {
        const responseData = response.data;
        if (!responseData || !responseData.post) {
          console.log("Blog not found");
          alert("Blog not found");
          setLoading(false);
          return;
        }
        setBlog(responseData.post);
        console.log(responseData.post )
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
    }, [id]);
  
    return {
      loading,
      blog
    };
  };
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blogs[]>([]);

    useEffect(()=>{
        axios.get(`${backend_url}/api/v1/all/bulk`,{  
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            const array=response.data
            console.log(array)
            setBlogs(array);
            setLoading(false)
        })
    },[])
    return{
        loading,
        blogs
    }
}
export const loghook=()=>{
  const navigate=useNavigate()
  const [logged,setlooged]=useState(false);
  const logOut=()=>{
    localStorage.clear()
    setlooged(false);
  }
  const Login=()=>{
    
    navigate("/signin")
  }
  const logtrue=()=>{
    setlooged(true)
  }
  return {logged,logOut,Login,logtrue}
}



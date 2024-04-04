import axios from "axios";
import { useEffect, useState } from "react"
import { backend_url } from "../config";

interface Blogs{
    "content":string,
    "title":string,
    "id":number,
    "author":{
        "name":string
    }
}

export interface Blog {
    id: string;
    content: string;
    title: string;
    author: {
      name: string;
    };
  }
  
  export const useBlog = (id:string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog >();
    
  
    useEffect(() => {
      axios.get(`${backend_url}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
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
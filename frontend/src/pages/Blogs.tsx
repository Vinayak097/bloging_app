import { BlogCart } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import {  useBlogs } from "../hooks"
import { Blogskeloton } from "../components/Blogskeleton";



export function  Blogs(){
    
    const {loading,blogs}=useBlogs();
    
    if(loading){
        return <div className="">
            <Appbar></Appbar>
            <div className="mt-2 flex justify-center">
                
                <div className="mt-4">
                <Blogskeloton></Blogskeloton>    
            <Blogskeloton></Blogskeloton>    
            <Blogskeloton></Blogskeloton> 
            <Blogskeloton></Blogskeloton>
            <Blogskeloton></Blogskeloton>
            
                </div>
            </div>
                 
        </div>
    }
    if(blogs==null){
        return <div>got null</div>
    }
    return (
        <div>
            <Appbar></Appbar>
            
        <div className=" flex justify-center ">
            <div className=" ">
                
            {blogs.map(blog => (
    <BlogCart
       
         // Assuming each blog has a unique ID
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate="Dec 3, 2023"
        id={blog.id} // Pass the correct id here
    />
))}
      
            </div> 
        </div>
        </div>
    )
    } 

    
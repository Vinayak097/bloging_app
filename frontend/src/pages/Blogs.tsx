import { BlogCart } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
interface Blog{
    content:string,
    title:string,
    id:string,
    author:{
        name:string
    }


}
// interface useblogstype{
//     loading:boolean,
//     blogs:Blog[]
// }
export function  Blogs(){
    
    const {loading,blogs}=useBlogs();
    
    if(loading){
        return <div>
            Loading
        </div>
    }
    return (
        <div>
            <Appbar></Appbar>
            {
                
            }
        <div className=" flex justify-center ">
            <div className=" ">
            {blogs.map(blog=>
                <BlogCart  authorName={blog.author.name} title={blog.title} 
                content={blog.content} publishedDate="Dec 3,2023" id={blog.id}></BlogCart>)}            
            </div> 
        </div>
        </div>
    )
    } 

    
import { Appbar } from "../components/Appbar";
import { Blogskeloton } from "../components/Blogskeleton";
import { Fullbog } from "../components/Fullblog";
import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";


export const Blog = () => {
  const {id}=useParams()
  const { loading, blog } = useBlog(id || "feb93749-eb56-449c-921a-41a30d904be0");
  const navigate=useNavigate()

  if (loading) {
    return <div className="">
    <Appbar></Appbar>
    <div className="grid grid-cols-3 mt-2 justify-center">
        <div className="mt-4 col-span-2">
        <Blogskeloton></Blogskeloton>    
    
        </div>
        <div className="col-span-1">
        <Blogskeloton></Blogskeloton>   

        </div>
        </div>
        </div>
  }

  if (!blog) {
    navigate("/signin")
    
  }

  return (
    <div>
      <Fullbog blog={blog}></Fullbog>
    

   
    <div className="">

      {/* <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Author: {blog.author.name || " hello"}</p> */}
    </div>
    </div>
  );
};

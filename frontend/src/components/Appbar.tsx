
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar=()=>{
    
    return <div className="flex justify-between px-10 py-2 border-b">
     
        <div className="flex flex-col justify-center bg-blue-500 p-1 rounded-md px-3">
            <Link to="/blogs">Home</Link>
        </div>
        
        <div className=" flex ">
        <div className="mx-8 flex flex-col justify-center bg-green-500 p-1 rounded-md px-5">
            <Link to="/publish">New</Link>
        </div>
        <div >
        <Avatar size={"big"} name="harkirat"></Avatar>
        </div>
            
        </div>
    </div>

}
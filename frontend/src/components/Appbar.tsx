
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar=()=>{
    
    return <div className="flex justify-between px-10 py-2 border-b">
     
        <div className="flex flex-col justify-center">
            <Link to="/blogs">Medium</Link>
        </div>
        <div className=" ">
            <Avatar size={"big"} name="harkirat"></Avatar>
        </div>

        
        



    </div>

}
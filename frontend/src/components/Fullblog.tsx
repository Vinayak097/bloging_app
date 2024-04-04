import { Appbar } from "./Appbar"

import { Avatar } from "./BlogCard"
export const Fullbog=({blog}:{blog:any})=>{
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
 
        <div className="grid grid-cols-12 px-10  pt-2 max-w-screen-xl w-full ">
            <div className=" col-span-8">
                
                <div className="text-3xl font-extrabold">
                    {blog.title}

                </div>
                <div className="text-slate-500 pt-2">
                    Post on 2nd decenmber 2023
                    
                </div>
                <div className="bg-screen-200 col-span-4 pt-4">
                    {blog.content}
                </div>
                
            </div>
            <div className=" col-span-4 font-light">
               Author
                <div className="flex ">
                    <div className="pr-3 flex flex-col justify-center">
                    <Avatar size={"big"} name={blog.author.name || "Pater"}></Avatar>
                    </div>
                    
                    <div>
                    <div className="font-bold  text-lg">
                    {blog.author.name|| "authorname"}
                    </div>
                    <div className="">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, veniam.

                    </div>
                    </div>
                </div>
               
            </div>
            <div>

            </div>
        </div>
        </div>
    </div>
}
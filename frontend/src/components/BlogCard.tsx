import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:string
   
}

export const BlogCart=({authorName,title,content,publishedDate,id}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}><div className="border  p-4 border-slate-200 pb-4 w-screen max-w-screen-md mt-2  ">
        <div className="flex">
            <Avatar name={authorName || "hello"} size="small"/>
            <div className="font-extralight text-black pl-2"> 
            {authorName}
            </div>
            <div className="flex pl-2 justify-center flex-col">
                <Circle></Circle>
            </div>
            <div className="font-thin pl-1 text-slate-500">
                
             {publishedDate}
            </div>           
        </div>   
        <div className=" pt-2 font-semibold text-2xl">
            {title}
        </div>
        <div className="text-md font-thin text-slate-500">
            {content.slice(0,100)+"..."}
        </div>                
        <div className="pt-2 text font-thin text-slate-400 text-sm">
            {`${Math.ceil(content.length/100)} minute(s)`}
        </div>
        
    </div></Link>
    
}
function Circle(){
    return <div className="h-1 w-1  rounded-full bg-slate-400">

    </div>
}
export function Avatar({name,size="small"}:{name:string,size:"small" |"big"}){
    
return <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size==="small" ? "w-6 h-6" :"w-8 h-8"}`}>
    <span className={`font-medium text-gray-600 dark:text-gray-300 ${size==="small" ? " text-xs":"text-md"}`}>{name[0]}</span>
</div>

}
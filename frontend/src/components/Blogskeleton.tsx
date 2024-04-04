import { Circle } from "./BlogCard"
export const Blogskeloton=()=>{
    return <div className="mt-4 px-6">
        
<div role="status" className=" animate-pulse">
<div className="border  p-4 border-slate-200 pb-4 w-screen max-w-screen-md mt-2  ">
        <div className="flex">
        <div className="h-4 w-4 bg-gray-200 rounded-full "></div>
            <div className="font-extralight text-black pl-2"> 
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>
            <div className="flex pl-2 justify-center flex-col">
                <Circle></Circle>
            </div>
            <div className="font-thin pl-1 text-slate-500">
                
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            </div>           
        </div>   
        <div className=" pt-2 font-semibold text-2xl">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        </div>
        <div className="text-md font-thin text-slate-500">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        </div>                
        <div className="pt-2 ">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        
    </div>
   
    <span className="sr-only">Loading...</span>
</div>
</div>
    
}
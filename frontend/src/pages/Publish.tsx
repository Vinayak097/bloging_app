
import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { backend_url } from "../config";
import { useNavigate } from "react-router-dom";
export const Publish = ()=>{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate=useNavigate();

    return <div>
            <Appbar></Appbar>
            <div className="mt-2 flex justify-center">     
                <div className=" w-full max-w-screen-lg">
                <input  onChange={(e)=>{
                    setTitle(e.target.value);
                }}  type="text"  className="  focus:outline-blue-100 f border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5    " placeholder="Title"></input>
                <div>   
                    <TextEditor onChange={(e)=>{setContent(e.target.value)}}></TextEditor>
                </div>
                <button onClick={
                    ()=>{
                        axios.post(`${backend_url}/api/v1/blog`,{
                            title,
                            content
                        },
                        {
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                        .then((response)=>{console.log("successfully posted")
                        navigate(`/blog/${response.data.id}`)
                                            
                    })
                    }
                } className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Publish</button>
                </div>
                
            </div>  
            
        </div>
}


function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void }){
    return <div>
        <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange}                 
                 id="editor" rows={8} className="focus:outline-blue-100 block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    </div>

}
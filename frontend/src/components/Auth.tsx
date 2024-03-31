
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {backend_url} from '../config.js'
export const Auth=({labeltype}:{labeltype :"signin" |"signup"})=>{
    const [username,setusername]=useState("")
    const navigate=useNavigate()
    const [password,setPassword]=useState("")
    const [email,setemail]=useState("") 
    const getpostrequest = async () => {
        try { 
            const response = await axios.post(
                `${backend_url}/api/v1/user/${labeltype === "signup" ? "signup" : "signin"}`,
                { email, password }
            );
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            console.error("Error:", error);
            return "Error occurred";
        }
    };
    
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className=" ">
                <div className="text-center px-5">
                    <div className=" text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="  font-light text-slate-400">
                        {labeltype === "signup" ?  "Alerady have an account? ":"Don't have an account? "  }
                        <Link className="pl-2 underline" to={labeltype==="signin" ?"/signup":"/signin"}>{labeltype === "signup" ? <>Login</>:<>Signup</>}</Link>
                
                    </div>

                </div>
                
                <div className="pt-5">
                    <div className="">
                        {labeltype==="signup"? 
                         <LabelledInput label="Username" placeholder="abbads23" onChange={(e)=>{
                            setusername(e.target.value)
                            }}></LabelledInput>:
                            null}
                    
                       
                        
                        <LabelledInput  label="Email" placeholder="abc@gmailc.com" onChange={(e)=>{setPassword(e.target.value)}}></LabelledInput>
                        <LabelledInput type="password" label="Password" placeholder="paswe34" onChange={(e)=>{setemail(e.target.value)
                        }}></LabelledInput>
                        <button onClick={()=>{getpostrequest()}} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
                        </div>
                </div>
            </div>
            
            
        </div>
    </div>
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            
            <label id="first_name" className="block mb-2 text-sm font-semibold text-black ">{label}</label>
                <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    );
}
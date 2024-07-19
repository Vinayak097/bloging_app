
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";

import {backend_url} from '../config.js'


export const Auth=({labeltype}:{labeltype :"signin" |"signup"})=>{
    const [name,setusername]=useState("")
    const [Loading,setloding]=useState(false);
    const navigate=useNavigate()
    const [password,setPassword]=useState("")
    const [email,setemail]=useState("")
    
   
    
    const getpostrequest = async () => {
        setloding(true)
       
        try { 
            const response = await axios.post(
                `${backend_url}/api/v1/user/${labeltype === "signup" ? "signup" : "signin"}`,
                { email, password,name }
            );
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            setloding(false)
            
            
            navigate("/blogs");
        } catch (error) {
            alert("invalid username/password")
            setloding(false) 
        }
        
    };
    
    
    return <div className="border  h-screen items-center flex justify-center flex-col">
        <div className="flex border w-fit justify-center rounded-md p-8 backdrop-grayscale-0 ">
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
                    
                        <LabelledInput  label="Email" placeholder="abc@gmailc.com" onChange={(e)=>{setemail(e.target.value)}}></LabelledInput>
                        <LabelledInput type="password" label="Password" placeholder="paswe34" onChange={(e)=>{setPassword(e.target.value)
                        }}></LabelledInput>
                        
                        <button onClick={async()=>{ 
                            setloding(true)
                            await getpostrequest()
                            setloding(false)  
                            }} type="button" className="w-full mt-4 text-white bg-gray-800 rounded-md p-2  hover:opacity-50">{Loading ?<Spinner></Spinner> :"Submit"}</button>
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
                <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    );
}
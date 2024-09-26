import { atom } from "recoil"

export const useratom=atom({
    key:"useratom",
    default:{
        name:''      ,
        email:''
    }
})

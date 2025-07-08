import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'
import Cookies from "js-cookie"

export const useGetTokenValue = (name)=>{
    const [tokenValue,setTokenValue] = useState("")
    const decodedToken = jwtDecode(Cookies.get("access_token"))   
    useEffect(()=>{
        setTokenValue(decodedToken[name])
    },[])
    return tokenValue
}
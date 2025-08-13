import { useEffect, useState } from "react"
import {jwtDecode} from 'jwt-decode'

export const useGetTokenValue = (name)=>{
    const [tokenValue,setTokenValue] = useState("")
    const decodedToken = jwtDecode(localStorage.AccessToken)   
    useEffect(()=>{
        setTokenValue(decodedToken[name])
    },[])
    return tokenValue
}
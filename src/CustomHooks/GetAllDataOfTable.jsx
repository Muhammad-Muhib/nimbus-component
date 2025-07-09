import { useEffect, useState } from "react"
import {getAllDataIndexDb} from "../IndexDbServices/indexDbServices"

export const useGetAllDataOfTable = (tableName,length = 0)=>{
    const [returnData,setReturnData] = useState([])
    useEffect(()=>{
        if(length == 0){
            fetchAllData();
        }
    },[])
    const fetchAllData = async ()=>{
        let data = await getAllDataIndexDb(tableName)
        setReturnData(data || [])
    }
    return (returnData || [])
}
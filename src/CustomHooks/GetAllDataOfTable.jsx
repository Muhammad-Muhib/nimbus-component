import { useEffect, useState } from "react"
import {getTableData} from "../IndexDbServices/indexDbServices"

export const useGetAllDataOfTable = (tableName,length = 0)=>{
    const [returnData,setReturnData] = useState([])
    useEffect(()=>{
        if(length == 0){
            fetchAllData();
        }
    },[])
    const fetchAllData = async ()=>{
        let data = await getTableData(tableName)
        setReturnData(data || [])
    }
    return (returnData || [])
}
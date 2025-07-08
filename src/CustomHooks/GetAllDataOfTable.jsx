import { useEffect, useState } from "react"
import {getAllDataIndexDb} from "../IndexDbServices/indexDbServices"

export const useGetAllDataOfTable = (tableName)=>{
    const [returnData,setReturnData] = useState([])
    useEffect(()=>{
        fetchAllData();
    },[])
    const fetchAllData = async ()=>{
        let data = await getAllDataIndexDb(tableName)
        setReturnData(data)
    }
    return returnData
}
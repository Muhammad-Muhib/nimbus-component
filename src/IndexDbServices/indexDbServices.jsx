import { openDB,deleteDB } from "idb";
const DB_Name = "myDataBase"

export const initDb = async () => {
  const tables = [
    {
        tableName: "Product",
        tableIndexes:["productId","productCode","productName","lineItemId","categoryId","subCategoryId","productItemId"],
        keyPath:'autoIncrement_ID'
    },    
    {
        tableName: "Company",
        tableIndexes:["CompanyId"],
        keyPath:'CompanyId'
    }
  ];
  return await openDB(DB_Name,1, {
    upgrade(db,oldVersion) {
        tables.map((item)=>{
            if(!db.objectStoreNames.contains(item.tableName)){
                let store = db.createObjectStore(item.tableName,{
                    keyPath:item.keyPath
                })
                item.tableIndexes.map((row)=>{
                    store.createIndex(row,row,{unique:false})
                })
            }
        })
    },
  });
};

export const addDataIndexDb = async (tableName,tableData)=>{
  const db = await openDB(DB_Name)
  return  tableData.map(async (item)=>{
      await db.add(tableName,item)
  })
}

export const getAllDataIndexDb = async(tableName)=>{
  const db = await openDB(DB_Name)
  return db.getAll(tableName)
}

export const checkIndexDBExistance = async()=>{
    const db = await openDB(DB_Name)
    const count = await db.count("Company")
    if(count > 0){
        return await db.getAll("Company")
    }else{
        return false
    }
}

export const addMultipleTableData = async(tableNameArray,tableDataArray)=>{
    tableNameArray.map(async (item,index)=>{
        return await addDataIndexDb(item,tableDataArray[index])
    })
}

export const deleteIndexDB = async()=>{
    return await deleteDB(DB_Name)
}

export const isIndexDBExist = async (companyId,dispatch,addAllProduct,apiUrl) => {
    const isExist = await checkIndexDBExistance();
    if (isExist == false) {
        syncIndexDB()
    } else {
      if(isExist[0].CompanyId != companyId){
        await deleteIndexDB();
        await initDb();
        syncIndexDB(companyId,dispatch,addAllProduct,apiUrl)
      }
    }
  };

const syncIndexDB = (companyId,dispatch,addAllProduct,apiUrl) => {
    let obj = {
      CompanyId: companyId,
    };
    apiService({
      endpoint: apiUrl + "/Common/GetProductList",
      method: "POST",
      data: obj,
    }).then((res) => {
      if (res.data.success) {
        let tableNameArray = ["Company", "Product"];
        let tableDataArray = [[{ CompanyId: companyId }], res.data.data];
        addMultipleTableData(tableNameArray, tableDataArray);
        dispatch(addAllProduct(res.data.data));
      }
    }).catch((ex)=>{
        console.log(ex)
    });
  };
import { openDB } from "idb";

export const initDb = async () => {
  const tables = [
    {
        tableName: "Product",
        tableIndexes:["productId","productCode","productName","lineItemId","categoryId","subCategoryId","productItemId"],
        keyPath:'autoIncrement_ID'
    },    
  ];
  return await openDB("myDataBase", 1, {
    upgrade(db) {
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
  const db = await openDB("myDataBase")
  return  tableData.map(async (item)=>{
      await db.add(tableName,item)
  })
}

export const getAllDataIndexDb = async(tableName)=>{
  const db = await openDB("myDataBase")
  return db.getAll(tableName)
}
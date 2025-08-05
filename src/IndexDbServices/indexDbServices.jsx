import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  product:
    "productCode,autoIncrement_ID,productId,productName,lineItemId,productItemId",
  company: "CompanyId",
  suppliers:"autoIncrement_ID,supplierId",
  shop:"value,label",
  rcmsConfiguration:"configurationId,configrationNo,configurationName,autoIncrement_ID"
});
export const initDb = async () => {
  return await db.open();
};

const syncDataIndexDb = async (tableData) => {
  return await Promise.all(
    tableData.map(async (item) => {
      const tableName = item.key; //To get Key Name
      const records = item.value;
      if (Array.isArray(records)) {
        await db[tableName].bulkAdd(records);
      } else {
        await db[tableName].add(records);
      }
    })
  );
};

export const getTableData = async (tableName) => {
  return await db[tableName].toArray();
};

export const syncIndexDb = async (tableData, companyId) => {
  let company = await db.company.get(companyId);  
  tableData = Object.entries(tableData).map(([key, value]) => ({
    key,
    value
}));
  if (company == null) {
    await db.delete();
    await initDb();
    db["company"].add({CompanyId : companyId});
    return await syncDataIndexDb(tableData);
  } else if (company.CompanyId != companyId) {
    await db.delete();
    db["company"].add({CompanyId : companyId});
    return await syncDataIndexDb(tableData);
  }
};

export const deleteDataIndexDb = async (tableName, key, data) => {
  let records = await db[tableName].where(key).equals(data).toArray();
  await records.map((item) => {
    db[tableName].delete(item.row);
  });
  return true;
};

export const updateDataIndexDb = async (tableName, key, id, data) => {
  let records = await db[tableName].where(key).equals(id).toArray();
  records.map((item) => {
    db[tableName].put(data, item.row);
  });
  return true;
};

export const addDataIndexDb = async (tableName, tableData) => {
  return await db[tableName].bulkAdd(tableData);
};

export const checkExistance = async()=>{
  await db.open();
  return await db.product.toCollection().first();
};
export const getTableDataByKey = async (tableName,key,id)=>{
  const data = await db[tableName].where(`${key}`).equals(id).first()
  return data;
}
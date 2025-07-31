import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  product:
    "productCode,autoIncrement_ID,productId,productName,lineItemId,productItemId",
  company: "CompanyId",
  suppliers:"value,label",
  shop:"value,label"
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
        db[tableName].bulkAdd(records);
      } else {
        db[tableName].add(records);
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

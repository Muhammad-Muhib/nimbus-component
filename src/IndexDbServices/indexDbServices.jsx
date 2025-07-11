import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  Product:
    "++row,autoIncrement_ID,productId,productCode,productName,lineItemId,productItemId",
  Company: "CompanyId",
});
export const initDb = async () => {
  return await db.open();
};

const syncDataIndexDb = async (tableData) => {
  return await Promise.all(
    tableData.map(async (item) => {
      const [tableName] = Object.keys(item); //To get Key Name
      const records = item[tableName];
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
  let company = await db.Company.get(companyId);
  if (company == null) {
    await db.delete();
    await initDb();
    return await syncDataIndexDb(tableData);
  } else if (company.CompanyId != companyId) {
    await db.delete();
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

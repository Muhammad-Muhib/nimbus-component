import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(2).stores({
  product:
    "productCode,productId,productName,lineItemId,productItemId,packagingBarcodeProductId",
  company: "CompanyId",
  suppliers:"supplierId",
  shop:"shopId,shopName",
  rcmsConfiguration:"configurationId,configrationNo,configurationName",
  creditCards:"creditCardId,cardName",
  department:"lineItemId,lineItemName"
});

const getUpdateKey = (tableName) => {
  const primaryKeys = {
    product: 'productCode',
    company: 'CompanyId',
    suppliers: 'supplierId',
    shop: 'value',
    rcmsConfiguration: 'configurationId',
    department:"lineItemId"
  };
  return primaryKeys[tableName];
};

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

export const getDataForDropDown = async (tableName,id,name) =>{
  const data = await getTableData(tableName)
  return await Promise.all(
    data.map((item)=>{
    return ({
      value : item[id],
      label : item[name]
    })
  })
  )
}

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

export const deleteDataIndexDb = async (tableData) => {
  try {
    // Handle both object and array formats
    let tableEntries = [];

    if (Array.isArray(tableData)) {
      // If it's already an array of {key, value} objects
      tableEntries = tableData;
    } else if (typeof tableData === "object" && tableData !== null) {
      // If it's an object with table names as keys
      tableEntries = Object.entries(tableData).map(([key, value]) => ({
        key,
        value,
      }));
    } else {
      return false;
    }

    // Handle each table's deletion based on specific criteria
    for (const tableEntry of tableEntries) {
      const tableName = tableEntry.key;
      const records = tableEntry.value;

      if (!Array.isArray(records) || records.length === 0) {
        continue;
      }

      switch (tableName) {        
        case "shop":
          // Delete shop data based on shopId
          for (const record of records) {
            if (record.shopId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.shopId)
                .delete();
              console.log(
                `Deleted ${deletedCount} shop records with shopId: ${record.shopId}`
              );
            }
          }
          break;
          // Delete department data based on DepartmentId
        case 'deparmtent':
          for (const record of records) {
            if (record.lineItemId) {
              const deletedCount = await db[tableName]
                .where("lineItemId")
                .equals(record.lineItemId)
                .delete();
              console.log(
                `Deleted ${deletedCount} lineItem records with LineItemId: ${record.lineItemId}`
              );
            }
          }
          break;

        case "suppliers":
          // Delete supplier data based on supplierId
          for (const record of records) {
            if (record.supplierID) {
              const deletedCount = await db[tableName]
                .where("supplierId")
                .equals(record.supplierID)
                .delete();
              console.log(
                `Deleted ${deletedCount} supplier records with supplierId: ${record.supplierId}`
              );
            }
          }
          break;

        case "product":
          // Handle product deletion based on different criteria
          for (const record of records) {
            if (record.productId) {
              // Delete by productId
              const deletedCount = await db[tableName]
                .where("productId")
                .equals(record.productId)
                .delete();
              console.log(
                `Deleted ${deletedCount} product records with productId: ${record.productId}`
              );
            }
          }
          break;

        case "productItem":
          // Handle productItem deletion based on productItemId
          for (const record of records) {
            if (record.productItemId) {
              const deletedCount = await db[tableName]
                .where("productItemId")
                .equals(record.productItemId)
                .delete();
              console.log(
                `Deleted ${deletedCount} productItem records with productItemId: ${record.productItemId}`
              );
            }
          }
          break;

        case "productNestedBarCode":
          // Handle productNestedBarCode deletion based on packagingBarcodeProductId
          for (const record of records) {
            if (record.packagingBarcodeProductId) {
              const deletedCount = await db[tableName]
                .where("packagingBarcodeProductId")
                .equals(record.packagingBarcodeProductId)
                .delete();
              console.log(
                `Deleted ${deletedCount} productNestedBarCode records with packagingBarcodeProductId: ${record.packagingBarcodeProductId}`
              );
            }
          }
          break;

        default:
          // For other tables, try to delete based on common patterns
          for (const record of records) {
            // Try to find a primary key or unique identifier
            const keys = Object.keys(record);
            for (const key of keys) {
              if (
                key.toLowerCase().includes("id") ||
                key.toLowerCase().includes("code")
              ) {
                try {
                  const deletedCount = await db[tableName]
                    .where(key)
                    .equals(record[key])
                    .delete();
                  console.log(
                    `Deleted ${deletedCount} ${tableName} records with ${key}: ${record[key]}`
                  );
                  break; // Exit inner loop once deletion is attempted
                } catch (error) {
                  console.warn(
                    `Failed to delete from ${tableName} using key ${key}:`,
                    error
                  );
                }
              }
            }
          }
          break;
      }
    }
    console.log("deleteDataIndexDb completed successfully");
    return true;
  } catch (error) {
    console.error("Error in deleteDataIndexDb:", error);
    return false;
  }
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

export const syncUpdateDataIndexDb = async (tableData) => {
  tableData = Object.entries(tableData).map(([key, value]) => ({
    key,
    value
}));
  return await Promise.all(
    tableData.map(async (item) => {
      const tableName = item.key; //To get Key Name
      const records = item.value;
      
      if (Array.isArray(records)) {
        await Promise.all(
          records.map(async (record) => {            
            const primaryKey = getUpdateKey(tableName);
            if (primaryKey && record[primaryKey]) {
              await db[tableName].put(record);
            } else {
              await db[tableName].add(record);
            }
          })
        );
      } else {
        const primaryKey = getUpdateKey(tableName);
        if (primaryKey && records[primaryKey]) {
          await db[tableName].put(records);
        } else {
          await db[tableName].add(records);
        }
      }
    })
  );
};
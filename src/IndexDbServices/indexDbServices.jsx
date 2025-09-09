import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(3).stores({
  product:
    "productCode,productId,productName,lineItemId,productItemId,packagingBarcodeProductId",
  company: "CompanyId",
  suppliers:"supplierId",
  shop:"shopId,shopName",
  rcmsConfiguration:"configurationId,configrationNo,configurationName",
  creditCards:"creditCardId,cardName",
  department:"lineItemId,lineItemName",
  category:"categoryId,categoryName",
  memberTypes:"memberTypeId,memberTypeName",
  subCategory:"subCategoryId,categoryId,subCategoryName,subCategoryCode",
  productGroup:"productGroupId,productGroupName",
  productSize:"sizeId,sizeName,lineItemId",
  color:"colorId,colorName,lineItemId",
  productAssembly:"productAssemblyId,productItemIdAssembly,productItemidPart",
  productAttribute1:"productAttribute1Id,lineItemId,productAttribute1Name",
  productAttribute2:"productAttribute2Id,lineItemId,productAttribute2Name",
  productAttribute3:"productAttribute3d,lineItemId,productAttribute3Name",
  productAttribute4:"productAttribute4Id,lineItemId,productAttribute4Name",
  productAttribute5:"productAttribute5Id,lineItemId,productAttribute5Name",
  productAttribute6:"productAttribute6Id,lineItemId,productAttribute6Name",
  productAttribute7:"productAttribute7Id,lineItemId,productAttribute7Name",
  productAttribute8:"productAttribute8Id,lineItemId,productAttribute8Name",
  productAttribute9:"productAttribute9Id,lineItemId,productAttribute9Name",
  grn:"",
  securityUser:"userId,userName,shopId",
  employeeType:"employeeTypeId,employeeTypeName,employeeTypeCode",
  memberInfo:"autoIncrementId,memberId,memberName,shopId",
  accountHead:"accountId,accountHead,accountHeadCount",
  customerTypeBasedPrice:"customerProdPriceId,customerTypeId,proItemId",
  productPriceShopBased:"autoIncrementId,shopId,productPriceShopBaseId,productItemId",
  discount:"autoIncrementId,discountId,discountCode,discountType",
  register:"id,shopId,registerCode",
  shopEmployee:"shopEmployeeId,employeeName,employeeCode,shopId"
});

const getUpdateKey = (tableName) => {
  const primaryKeys = {
    product: 'productCode',
    company: 'CompanyId',
    suppliers: 'supplierId',
    shop: 'value',
    rcmsConfiguration: 'configurationId',
    creditCards:"creditCardId",
    department:"lineItemId",
    category:"categoryId",
    memberTypes:"memberTypeId",
    subCategory:"subCategoryId",
    productGroup:"productGroupId",
    productSize:"sizeId",
    color:"colorId",
    productAssembly:"productAssemblyId",
    productAttribute1:"productAttribute1Id",
    productAttribute2:"productAttribute2Id",
    productAttribute3:"productAttribute3d",
    productAttribute4:"productAttribute4Id",
    productAttribute5:"productAttribute5Id",
    productAttribute6:"productAttribute6Id",
    productAttribute7:"productAttribute7Id",
    productAttribute8:"productAttribute8Id",
    productAttribute9:"productAttribute9Id",
    securityUser:"userId",
    employeeType:"employeeTypeId",
    memberInfo:"autoIncrementId",
    accountHead:"accountId",
    customerTypeBasedPrice:"customerProdPriceId",
    productPriceShopBased:"autoIncrementId",
    discount:"autoIncrementId",
    register:"Id",
    shopEmployee:"shopEmployeeId"
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
          case "creditCards":
          // Delete creditCards data based on creditCardId
          for (const record of records) {
            if (record.creditCardId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.creditCardId)
                .delete();
              console.log(
                `Deleted ${deletedCount} creditCards records with creditCardId: ${record.creditCardId}`
              );
            }
          }
          break;
              case "customerTypeBasedPrice":
          // Delete customerTypeBasedPrice data based on customerProdPriceId
          for (const record of records) {
            if (record.customerProdPriceId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.customerProdPriceId)
                .delete();
              console.log(
                `Deleted ${deletedCount} customerTypeBasedPrice records with customerProdPriceId: ${record.customerProdPriceId}`
              );
            }
          }
          case "shopEmployee":
          // Delete shopEmployee data based on shopEmployeeId
          for (const record of records) {
            if (record.shopEmployeeId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.shopEmployeeId)
                .delete();
              console.log(
                `Deleted ${deletedCount} shopEmployee records with autoIncrementId: ${record.shopEmployeeId}`
              );
            }
          }
           case "register":
          // Delete register data based on registerId
          for (const record of records) {
            if (record.registerId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.registerId)
                .delete();
              console.log(
                `Deleted ${deletedCount} register records with registerId: ${record.registerId}`
              );
            }
          }
          break;
             case "productPriceShopBased":
          // Delete productPriceShopBased data based on autoIncrementId
          for (const record of records) {
            if (record.autoIncrementId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.autoIncrementId)
                .delete();
              console.log(
                `Deleted ${deletedCount} productPriceShopBased records with autoIncrementId: ${record.autoIncrementId}`
              );
            }
          }
          break;
             case "discount":
          // Delete discount data based on autoIncrementId
          for (const record of records) {
            if (record.autoIncrementId) {
              const deletedCount = await db[tableName]
                .where("value")
                .equals(record.autoIncrementId)
                .delete();
              console.log(
                `Deleted ${deletedCount} discount records with autoIncrementId: ${record.autoIncrementId}`
              );
            }
          }
          break;
          // Delete employeeType data based on employeeTypeId
        case 'employeeType':
          for (const record of records) {
            if (record.employeeTypeId) {
              const deletedCount = await db[tableName]
                .where("employeeTypeId")
                .equals(record.employeeTypeId)
                .delete();
              console.log(
                `Deleted ${deletedCount} employeeType records with employeeTypeId: ${record.employeeTypeId}`
              );
            }
          }
          break;
            // Delete accountHead data based on employeeTypeId
        case 'accountHead':
          for (const record of records) {
            if (record.accountId) {
              const deletedCount = await db[tableName]
                .where("accountId")
                .equals(record.accountId)
                .delete();
              console.log(
                `Deleted ${deletedCount} accountHead records with accountId: ${record.accountId}`
              );
            }
          }
          break;
          // Delete memberTypes data based on memberTypesId
        case 'memberTypes':
          for (const record of records) {
            if (record.memberTypeId) {
              const deletedCount = await db[tableName]
                .where("memberTypeId")
                .equals(record.memberTypeId)
                .delete();
              console.log(
                `Deleted ${deletedCount} lineItem records with MemberTypeId: ${record.memberTypeId}`
              );
            }
          }
          break;
          // Delete productAssembly data based on productAssemblyId
        case 'productAssembly':
          for (const record of records) {
            if (record.productAssemblyId) {
              const deletedCount = await db[tableName]
                .where("productAssemblyId")
                .equals(record.productAssemblyId)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product Assembly records with productAssemblyId: ${record.productAssemblyId}`
              );
            }
          }
          break;
          // Delete productAttribute data based on productAttribute1
        case 'productAttribute1':
          for (const record of records) {
            if (record.productAttribute1Id) {
              const deletedCount = await db[tableName]
                .where("productAssemblyId")
                .equals(record.productAttribute1Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product Attribute1Id records with productAttribute1Id: ${record.productAttribute1Id}`
              );
            }
          }
          break;
          // Delete productAttribute data based on productAttribute1
        case 'productAttribute2':
          for (const record of records) {
            if (record.productAttribute2Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute2Id")
                .equals(record.productAttribute2Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product Product Attribute 2 records with productAttribute2Id: ${record.productAttribute2Id}`
              );
            }
          }
          break;
          // Delete productAttribute data based on productAttribute1
        case 'productAttribute3':
          for (const record of records) {
            if (record.productAttribute3Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute3Id")
                .equals(record.productAttribute3Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 3 records with productAttribute3Id: ${record.productAttribute3Id}`
              );
            }
          }
          break;
          // Delete productAttribute data based on productAttribute1
        case 'productAttribute4':
          for (const record of records) {
            if (record.productAttribute4Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute4Id")
                .equals(record.productAttribute4Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 4 records with productAttribute4Id: ${record.productAttribute4Id}`
              );
            }
          }
          break;
  // Delete productAttribute data based on productAttribute1
        case 'productAttribute5':
          for (const record of records) {
            if (record.productAttribute5Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute5Id")
                .equals(record.productAttribute5Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute5 records with productAttribute5Id: ${record.productAttribute5Id}`
              );
            }
          }
          break;
  // Delete productAttribute data based on productAttribute1
        case 'productAttribute6':
          for (const record of records) {
            if (record.productAttribute6Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute6Id")
                .equals(record.productAttribute6Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 6 records with productAttribute6Id: ${record.productAttribute6Id}`
              );
            }
          }
          break;
  // Delete productAttribute data based on productAttribute1
        case 'productAttribute7':
          for (const record of records) {
            if (record.productAttribute7Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute7Id")
                .equals(record.productAttribute7Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 7 records with productAttribute7Id: ${record.productAttribute7Id}`
              );
            }
          }
          break;
      // Delete productAttribute data based on productAttribute1
        case 'productAttribute8':
          for (const record of records) {
            if (record.productAttribute8Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute8Id")
                .equals(record.productAttribute8Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 8 records with productAttribute8Id: ${record.productAttribute8Id}`
              );
            }
          }
          break;
      // Delete productAttribute data based on productAttribute9
        case 'productAttribute9':
          for (const record of records) {
            if (record.productAttribute9Id) {
              const deletedCount = await db[tableName]
                .where("productAttribute9Id")
                .equals(record.productAttribute9Id)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product product Attribute 9 records with productAttribute9Id: ${record.productAttribute9Id}`
              );
            }
          }
          break;
          // Delete productSize data based on sizeId
          case 'productSize':
          for (const record of records) {
            if (record.sizeId) {
              const deletedCount = await db[tableName]
                .where("sizeId")
                .equals(record.sizeId)
                .delete();
              console.log(
                `Deleted ${deletedCount} ProductSize records with sizeId: ${record.sizeId}`
              );
            }
          }
          break;
          // Delete color data based on colorId
          case 'color':
          for (const record of records) {
            if (record.colorId) {
              const deletedCount = await db[tableName]
                .where("colorId")
                .equals(record.colorId)
                .delete();
              console.log(
                `Deleted ${deletedCount} Color records with colorId: ${record.colorId}`
              );
            }
          }
          break;
          
          // Delete memberTypes data based on memberTypesId
        case 'productGroup':
          for (const record of records) {
            if (record.productGroupId) {
              const deletedCount = await db[tableName]
                .where("productGroupId")
                .equals(record.productGroupId)
                .delete();
              console.log(
                `Deleted ${deletedCount} Product Group records with productGroupId: ${record.productGroupId}`
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
      // Delete SubCategory data based on SubCategoryId
        case 'subCategory':
          for (const record of records) {
            if (record.subCategoryId) {
              const deletedCount = await db[tableName]
                .where("subCategoryId")
                .equals(record.subCategoryId)
                .delete();
              console.log(
                `Deleted ${deletedCount} Sub Category records with SubCategoryId: ${record.subCategoryId}`
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
          // Delete category data based on categoryId
        case 'category':
          for (const record of records) {
            if (record.categoryId) {
              const deletedCount = await db[tableName]
                .where("categoryId")
                .equals(record.categoryId)
                .delete();
              console.log(
                `Deleted ${deletedCount} category records with categoryId: ${record.categoryId}`
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
              const deletedCount = await db.product
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
              const deletedCount = await db.product
                .where("packagingBarcodeProductId")
                .equals(record.packagingBarcodeProductId)
                .delete();
              console.log(
                `Deleted ${deletedCount} productNestedBarCode records with packagingBarcodeProductId: ${record.packagingBarcodeProductId}`
              );
            }
          }
          break;
          case "securityUser":
          // Handle UserId deletion based on UserId 
          for (const record of records) {
            if (record.userId) {
              const deletedCount = await db[tableName]
                .where("userId")
                .equals(record.userId)
                .delete();
              console.log(
                `Deleted ${deletedCount} securityUser records with userId: ${record.userId}`
              );
            }
          }
          break;
          case 'memberInfo':
            for (const record of records) {
              if (record.autoIncrementId) {
                const deletedCount = await db[tableName]
                  .where("autoIncrementId")
                  .equals(record.autoIncrementId)
                  .delete();
                console.log(
                  `Deleted ${deletedCount} memberInfo records with autoIncrementId: ${record.autoIncrementId}`
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

export const addUpdateGRNIndexDb = async(grnModel)=>{
    return await db.grn.put(grnModel,"singleton");   
}
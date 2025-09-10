import { Link } from "react-router-dom";
import "../../css/index.css";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosSettings,IoIosArrowDown,IoIosArrowForward } from "react-icons/io";
import { useState} from "react";
import { FaInfoCircle,FaShieldAlt,FaIndent,FaChartLine,FaChartArea,FaSitemap,FaShoppingCart } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdLaptop,MdGroups } from "react-icons/md";

export default function LeftMenuList(props) {
    const [expandedMenus, setExpandedMenus] = useState({});
    const [expandedSubMenu, setExpandedSubMenu] = useState({});
  const toggleMenu = (menu) => {
    setExpandedMenus((prevState) => ({
      [menu]: !prevState[menu],
    }));
    setExpandedSubMenu({})
  }
  const toggleSubMenu = (menu) => {
    setExpandedSubMenu((prevState) => ({
      [menu]: !prevState[menu],
    }));
  }
  return (
    <ul className="scoop-item scoop-left-item" style={ props.showLeftMenu ? {maxHeight: "78%"} : {maxHeight: "100%"}}> 
          <li className="active dashboardContainer navContainer"><Link className="navLink mainMenuText" to="/app/Home"><span className="scoop-micon"><AiFillDashboard className="scoop-icon" /></span><span className="scoop-mtext "> Dashboard</span></Link></li>
          <li className="active navContainer navMenu">
            <ul className="navList">
            <Link onClick={() => toggleMenu("configuration")} className="navLink" ><span className="scoop-micon"><IoIosSettings className="scoop-icon" /></span><span className="scoop-mtext "> Configurations {
                  expandedMenus["configuration"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
            {
              expandedMenus["configuration"] ? <div className="navlistcontainer">
                <li className="active subMenuLink"><Link className="navLink listLink" to="/app/SystemConfiguration"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> System Configuration</span></Link></li>
                <Link onClick={() => toggleSubMenu("StoreConfiguration")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Store Configuration {
                  expandedSubMenu["StoreConfiguration"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                    expandedSubMenu["StoreConfiguration"] ? <>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/StoreDefinition"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Store Definition</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/EmployeeType"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Employee Type</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/Register"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Register</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/StoreEmployee"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Store Employee</span></Link></li>
                    </> : <></>
                  }
                  <li className="active"><Link className="navLink listLink" to="/app/LineItem"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Department</span></Link></li>
              <li className="active "><Link className="navLink listLink" to="/app/City"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> City</span></Link></li>
              <li className="active "><Link className="navLink listLink" to="/app/CityArea"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> City Area</span></Link></li>
          <li className="active"><Link className="navLink listLink" to="/app/Creditcardbank"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Credit Cards Banks</span></Link></li>
          <li className="active"><Link className="navLink listLink" to="/app/LoyaltyClub"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Loyalty Club</span></Link></li>
          <li className="active"><Link className="navLink listLink" to="/app/SetupOnlineStore"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Setup Online Store</span></Link></li>
              </div> : <></>
            }
            </ul>
          </li>
          <li className="active navContainer navMenu">
          <ul className="navList">
          <Link onClick={() => toggleMenu("items")} className="navLink"><span className="scoop-micon"><FaSitemap className="scoop-icon" /></span><span className="scoop-mtext "> Items {
                  expandedMenus["items"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
              expandedMenus["items"] ? <div className="navlistcontainer">
                <li className="active"><Link className="navLink listLink" to="/app/ProductDefinition"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Definition</span></Link></li>
                <li className="active"><Link className="navLink listLink" to="/app/ImportItemsData"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Import Items Data</span></Link></li>
                <li className="active"><Link className="navLink listLink" to="/app/UpdateItemsInformation"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Update Items Information</span></Link></li>
                <li className="active"><Link className="navLink listLink" to="/app/ItemCodeTemplate"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Code Template</span></Link></li>
                <li className="active"><Link className="navLink listLink" to="/app/ItemBarcodePrinting"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Barcode Printing</span></Link></li>
                <Link onClick={() => toggleSubMenu("ItemPricing")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Item Pricing {
                  expandedSubMenu["ItemPricing"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                    expandedSubMenu["ItemPricing"] ? <>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/ChangeItemRetailPrice"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Change Item Retail Price</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/ChangeItemCostPrice"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Change Item Cost Price</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/CustomerTypesBasedPrices"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customer's Types Based Prices</span></Link></li>
          <li className="active"><Link className="navLink listLink subLink" to="/app/StoreBasedPrices"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Store Based Prices</span></Link></li>
                    </> : <></>
                }
                <li className="active"><Link className="navLink listLink" to="/app/ItemCombinations"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Combinations</span></Link></li>
                <li className="active"><Link className="navLink listLink" to="/app/ItemSizes"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Sizes</span></Link></li>
                <Link onClick={() => toggleSubMenu("DepartmentBasedAttributes")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Department Based Attributes {
                  expandedSubMenu["DepartmentBasedAttributes"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["DepartmentBasedAttributes"] ? <>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ItemGroup"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Group</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute1"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{props.attributeNames[0].configurationValue || "DB attribute 1"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute3"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{props.attributeNames[2].configurationValue || "DB attribute 2"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/Category"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Category</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/SubCategory"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Sub Category</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("ItemBasedAttributes")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Item Based Attributes {
                  expandedSubMenu["ItemBasedAttributes"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["ItemBasedAttributes"] ? <>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute2"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{ props.attributeNames[1].configurationValue || "Calender Season"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute4"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{ props.attributeNames[3].configurationValue || "IB attribute 2"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute5"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{ props.attributeNames[4].configurationValue || "Gender"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute6"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{ props.attributeNames[5].configurationValue || "Brand"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute7"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{ props.attributeNames[6].configurationValue || "IB attribute 5"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute8"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{props.attributeNames[7].configurationValue || "IB attribute 6"}</span></Link></li>
                  <li className="active"><Link className="navLink listLink subLink" to="/app/ProductAttribute9"><span className="scoop-micon"></span><span className="scoop-mtext list-text">{props.attributeNames[8].configurationValue || "Modifier Group"}</span></Link></li>
                  </> : <></>
                }
              </div> : <></>
                }
          </ul>
          </li>
          <li className="active navContainer navMenu">
          <ul className="navList">
          <Link onClick={() => toggleMenu("Purchase")} className="navLink"><span className="scoop-micon"><RiShoppingBasketLine className="scoop-icon" /></span><span className="scoop-mtext "> Purchase {
                  expandedMenus["Purchase"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Purchase"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/PurchaseOrder"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Purchase Order</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/POMatrix"><span className="scoop-micon"></span><span className="scoop-mtext list-text">PO Matrix (Purchase Order Matrix)</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/GRN"><span className="scoop-micon"></span><span className="scoop-mtext list-text">GRN (Goods Receipt Note)</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/GRNMatrix"><span className="scoop-micon"></span><span className="scoop-mtext list-text">GRN Matrix(Goods Receipt Note Matrix)</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/RTV"><span className="scoop-micon"></span><span className="scoop-mtext list-text">RTV (Return to Vendor)</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/POApprovalLimits"><span className="scoop-micon"></span><span className="scoop-mtext list-text">PO Approval Limits</span></Link></li>
                  </div> : <></>
                }
            </ul>
            </li>
            <li className="active navContainer navMenu">
            <ul className="navList">
            <Link onClick={() => toggleMenu("Sale")} className="navLink"><span className="scoop-micon"><FaShoppingCart className="scoop-icon" /></span><span className="scoop-mtext "> Sale {
                  expandedMenus["Sale"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Sale"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/SaleAndReturn"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Sale And Return</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/Discounts"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Discounts</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/Shift Management"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Shift Management</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/EndofDay"><span className="scoop-micon"></span><span className="scoop-mtext list-text">End of Day</span></Link></li>
                    <Link onClick={() => toggleSubMenu("GiftCards")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Gift Cards {
                  expandedSubMenu["GiftCards"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["GiftCards"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/GiftCardConfiguration"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Gift Card Configuration</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/GiftCardCreation"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Gift Card Creation</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/GiftCardSummaryReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Gift Card Summary Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/GiftCardTransactions"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Gift Card Transactions</span></Link></li>
                  </> : <></>
                }
                  </div> : <></>
                }
              </ul>
              </li>
              <li className="active navContainer navMenu">
              <ul className="navList">
              <Link onClick={() => toggleMenu("InventoryMGMT")} className="navLink"><span className="scoop-micon"><MdLaptop className="scoop-icon" /></span><span className="scoop-mtext "> Inventory MGMT {
                  expandedMenus["InventoryMGMT"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["InventoryMGMT"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/StockCount"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Stock Count</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/StockTransfer"><span className="scoop-micon"></span><span className="scoop-mtext list-text">STR (Stock Transfer)</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/STRRequest"><span className="scoop-micon"></span><span className="scoop-mtext list-text">STR Request</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/InventoryAdjustment"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Inventory Adjustment</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/InventoryAdjustmentReasons"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Inventory Adjustment Reasons</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/InventoryLevels"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Inventory Levels</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/ProductAssembly"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Assemble/Dismantle</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/ItemSerialNumber"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Serial Number</span></Link></li>
                  </div> : <></>
                }
                </ul>
                </li>
                <li className="active navContainer navMenu">
              <ul className="navList">
              <Link onClick={() => toggleMenu("Parties")} className="navLink"><span className="scoop-micon"><MdGroups className="scoop-icon" /></span><span className="scoop-mtext "> Parties {
                  expandedMenus["Parties"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Parties"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/Customers"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customers</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/CustomerType"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customer Type</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/CustomerOpeningBalance"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customer Opening Balance</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/LoyaltyPointsAdjustment"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Loyalty Points Adjustment</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/Suppliers"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Suppliers</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/SupplierOpeningBalance"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Supplier Opening Balance</span></Link></li>
                  </div> : <></>
                }
                </ul>
                </li>
                <li className="active navContainer navMenu">
                <ul className="navList">
                <Link onClick={() => toggleMenu("Accounts")} className="navLink"><span className="scoop-micon"><FaChartArea className="scoop-icon" /></span><span className="scoop-mtext "> Accounts {
                  expandedMenus["Accounts"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Accounts"] ? <div className="navlistcontainer"> 
                  <li className="active"><Link className="navLink listLink" to="/app/AccountTransactions"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Account Transactions</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/AccountHeads"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Account Heads</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/CustomerReceipt"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customer Receipt</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/SupplierPayment"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Supplier Payment</span></Link></li>
                  </div> : <></>
                }
                  </ul>
                  </li>
                  <li className="active navContainer navMenu">
                  <ul className="navList">
                  <Link onClick={() => toggleMenu("Reports")} className="navLink"><span className="scoop-micon"><FaChartLine className="scoop-icon" /></span><span className="scoop-mtext "> Reports {
                  expandedMenus["Reports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Reports"] ? <div className="navlistcontainer">
                          <Link onClick={() => toggleSubMenu("AAccountReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> A-Account Reports {
                  expandedSubMenu["AAccountReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["AAccountReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ShopIncomeStatementReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-01 Store Income Statement Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/CustomerLedgerReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-02 Customer Ledger Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SupplierLedgerReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-03 Supplier Ledger Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/DayWiseBankSummaryReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-04 Day Wise Bank Summary Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/AccountLedgerReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-05 Account Ledger Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ReceivablePayableReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">A-06 Receivable & Payable Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("BAuditReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> B-Audit Reports {
                  expandedSubMenu["BAuditReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["BAuditReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/BinCardReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">B-01 Bin Card Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("CSalesReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> C-Sales Reports {
                  expandedSubMenu["CSalesReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["CSalesReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/StoreSalesReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">C-01 Store Sales Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SalespersonReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">C-02 Salesperson Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SalesProfitMarginReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">C-03 Sales Profit Margin Report(Item Wise)</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/StoreWiseSaleSummaryReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">C-04 Store Wise Sale Summary Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("DStockReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> D-Stock Reports {
                  expandedSubMenu["DStockReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["DStockReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/InventorySnapshotReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-01 Inventory Snapshot Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/STRDetailReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-02 STR Detail Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/InventoryMatrixReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-03 Inventory Matrix Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/InventorySnapshotMultiStore"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-04 Inventory Snapshot Multi-Store</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/InventoryLevelReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-05 Inventory Level Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/CategoryWiseStockValueReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">D-06 Category Wise Stock Value Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("ECustomerReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> E-Customer Reports {
                  expandedSubMenu["ECustomerReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["ECustomerReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/LoyalityLedgerReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">E-01 Loyality Ledger Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/RegularCustomersReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">E-02 Regular Customers Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/WalkinCustomerReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">E-03 Walk-in Customer Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("FPurchaseReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> F-Purchase Reports {
                  expandedSubMenu["FPurchaseReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["FPurchaseReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/PurchaseReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">F-01 Purchase Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("GFBRReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> G-FBR Reports {
                  expandedSubMenu["GFBRReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["GFBRReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/FBRAuditInvoices"><span className="scoop-micon"></span><span className="scoop-mtext list-text">G-01 FBR Audit Invoices</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/FBRSaleSyncStatus"><span className="scoop-micon"></span><span className="scoop-mtext list-text">G-02 FBR/PRA Sale Sync Status</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("MMiscReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> M-Misc Reports {
                  expandedSubMenu["MMiscReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["MMiscReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/FailedSMSReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">M-01 Failed SMS Report</span></Link></li>
                  </> : <></>
                }
                <Link onClick={() => toggleSubMenu("PItemsReports")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> P-Items Reports {
                  expandedSubMenu["PItemsReports"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["PItemsReports"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ItemLoaderErrorReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">P-01 Item Loader Error Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ItemExpiryReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">P-02 Item Expiry Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ItemsExportReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">P-03 Items Export Report</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ItemMovementReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">P-04 Item Movement Report</span></Link></li>
                  </> : <></>
                }
                  </div> : <></>
                }
                    </ul>
                    </li>
                  <li className="active navContainer navMenu">
                  <ul className="navList">
                <Link onClick={() => toggleMenu("Utilities")} className="navLink"><span className="scoop-micon"><FaIndent className="scoop-icon" /></span><span className="scoop-mtext "> Utilities {
                  expandedMenus["Utilities"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                    expandedMenus["Utilities"] ? <div className="navlistcontainer">
                      <Link onClick={() => toggleSubMenu("Setup&Configuration")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Setup & Configuration {
                  expandedSubMenu["Setup&Configuration"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["Setup&Configuration"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ReceiptPageSetup"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Receipt Page Setup</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/BarcodeTemplateSetting"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Barcode Template Setting</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SMSEmailConfiguration"><span className="scoop-micon"></span><span className="scoop-mtext list-text">SMS/Email Configuration</span></Link></li>
                  </> : <></>
                }
                      <Link onClick={() => toggleSubMenu("GeneralUtilities")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> General Utilities {
                  expandedSubMenu["GeneralUtilities"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["GeneralUtilities"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SendSMSEmaiil"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Send SMS/Emaiil</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/CustomerLoader"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Customer Loader</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SyncMasterData"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Sync Master Data</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SystemMaintenance"><span className="scoop-micon"></span><span className="scoop-mtext list-text">System Maintenance</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/SyncMissingSales"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Sync Missing Sales</span></Link></li>
                  </> : <></>
                }
                      <Link onClick={() => toggleSubMenu("ItemUtilities")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Item Utilities {
                  expandedSubMenu["ItemUtilities"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                {
                  expandedSubMenu["ItemUtilities"] ? <>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ImportItemsData"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Import Items Data</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/UpdateItemsInformation"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Update Items Information</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/GenerateCalandercompatiblefile"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Generate Calander compatible file</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/CheckItemStock"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Check Item Stock</span></Link></li>
                  <li className="active "><Link className="navLink listLink subLink" to="/app/ItemDeletionUtility"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Item Deletion Utility</span></Link></li>
                  </> : <></>
                }
                    <li className="active"><Link className="navLink listLink" to="/app/ReceiptTemplateDesigner"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Receipt Template Designer</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/CleanData"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Clean Data</span></Link></li>
                    </div> : <></>
                  }
                    </ul>
                    </li>
                  <li className="active navContainer navMenu">
                  <ul className="navList">
                  <Link onClick={() => toggleMenu("Ecommerce")} className="navLink"><span className="scoop-micon"><FaShoppingCart className="scoop-icon" /></span><span className="scoop-mtext "> Ecommerce {
                  expandedMenus["Ecommerce"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>    
                {
                  expandedMenus["Ecommerce"] ? <div className="navlistcontainer"> 
                  <li className="active"><Link className="navLink listLink" to="/app/SetupOnlineStore"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Setup Online Store</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/UnProcessedOnlineOrders"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Un-Processed Online Orders</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/OnlineOrderTracking"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Online Order Tracking</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/OnlineItemsStock"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Online Items Stock</span></Link></li>
                  <li className="active"><Link className="navLink listLink" to="/app/OnlineSalesReport"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Online Sales Report</span></Link></li>
                  <Link onClick={() => toggleSubMenu("CourierManagement")} className="navLink listLink"><span className="scoop-micon"></span><span className="scoop-mtext list-text"> Courier Management {
                  expandedSubMenu["CourierManagement"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                } </span></Link>
                  {
                    expandedSubMenu["CourierManagement"] ? <>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/CourierCompany"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Courier Company</span></Link></li>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/CourierAttachment"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Courier Attachment</span></Link></li>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/PaymentManagement"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Payment Management</span></Link></li>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/CourierExpense"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Courier Expense</span></Link></li>
                    <li className="active "><Link className="navLink listLink subLink" to="/app/CourierLedger"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Courier Ledger</span></Link></li>
                    </> : <></>
                  }
                  <li className="active"><Link className="navLink listLink" to="/app/IntegrationSyncingError"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Integration Syncing Error</span></Link></li>
                   </div> : <></>
                }
                    </ul>
                    </li>
                  <li className="active navContainer navMenu">
                  <ul className="navList">
                  <Link onClick={() => toggleMenu("Security")} className="navLink"><span className="scoop-micon"><FaShieldAlt className="scoop-icon" /></span><span className="scoop-mtext "> Security {
                  expandedMenus["Security"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>    
                {
                  expandedMenus["Security"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/SecurityGroup"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Security Group</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/GroupDepartmentRights"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Link Departments to Group</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/ShopDefinition"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Block Departments at Store</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/SecurityUsers"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Security Users</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/GroupRights"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Group Rights</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/ChangePassword"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Change Password</span></Link></li>
                  </div> : <></>
                }
                    </ul>
                    </li>
                  <li className="active navContainer navMenu">
                <ul className="navList">
                <Link onClick={() => toggleMenu("Help")} className="navLink"><span className="scoop-micon"><FaInfoCircle className="scoop-icon" /></span><span className="scoop-mtext "> Help {
                  expandedMenus["Help"] ?<IoIosArrowDown className='navArrow' />:<IoIosArrowForward className='navArrow' />
                }</span></Link>
                {
                  expandedMenus["Help"] ? <div className="navlistcontainer">
                    <li className="active"><Link className="navLink listLink" to="/app/NimbusHelp"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Nimbus Help</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/GenerateTicket"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Generate Ticket</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/ContactUs"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Contact Us</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/AboutNimbus"><span className="scoop-micon"></span><span className="scoop-mtext list-text">About Nimbus</span></Link></li>
                    <li className="active"><Link className="navLink listLink" to="/app/HelpVideos"><span className="scoop-micon"></span><span className="scoop-mtext list-text">Help Videos</span></Link></li>
                  </div> : <></>
                }
                  </ul>
                  </li>
          </ul>          
  )
}
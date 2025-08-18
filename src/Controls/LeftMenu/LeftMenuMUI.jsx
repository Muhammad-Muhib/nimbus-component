// import { useState } from "react";
// import { 
//   Drawer, 
//   List, 
//   ListItem, 
//   ListItemButton, 
//   ListItemIcon, 
//   ListItemText,
//   Collapse,
//   Box,
//   Typography,
//   IconButton,
//   Tooltip
// } from "@mui/material";
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   Dashboard,
//   Settings,
//   Sitemap,
//   ShoppingCart,
//   Laptop,
//   Groups,
//   PieChart,
//   ShowChart,
//   ShoppingBasket,
//   ExitToApp
// } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";

// // Styled components
// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   minHeight: '64px',
//   backgroundColor: '#fff',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   borderBottom: '1px solid #eaeaea'
// }));

// const LogoContainer = styled('div')({
//   cursor: 'pointer',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100%',
//   padding: '8px 0'
// });

// const Logo = styled('img')({
//   height: '100%',
//   maxHeight: '48px'
// });

// const StyledDrawer = styled(Drawer)(({ theme, open, variant }) => ({
//   width: open ? 240 : 65,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: open ? 240 : 65,
//     boxSizing: 'border-box',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: 'hidden',
//     backgroundColor: '#f8f9fa',
//     borderRight: '1px solid #eaeaea'
//   }
// }));

// const MenuItem = styled(ListItemButton)(({ theme, active }) => ({
//   minHeight: 48,
//   padding: theme.spacing(0, 2),
//   margin: theme.spacing(0.5, 1),
//   borderRadius: theme.spacing(1),
//   backgroundColor: active ? '#e3f2fd' : 'transparent',
//   color: active ? '#1976d2' : '#637287',
//   '&:hover': {
//     backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
//   },
//   '& .MuiListItemIcon-root': {
//     color: active ? '#1976d2' : '#a6adc8',
//     minWidth: 40
//   }
// }));

// const SubMenuItem = styled(ListItemButton)(({ theme, level = 0 }) => ({
//   minHeight: 40,
//   padding: theme.spacing(0, 2 + level * 2),
//   margin: theme.spacing(0.25, 1),
//   borderRadius: theme.spacing(0.5),
//   backgroundColor: '#448BCB',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#3a7bb8',
//   },
//   '& .MuiListItemIcon-root': {
//     color: 'white',
//     minWidth: 40
//   }
// }));

// const SubSubMenuItem = styled(ListItemButton)(({ theme, level = 0 }) => ({
//   minHeight: 36,
//   padding: theme.spacing(0, 2 + level * 2),
//   margin: theme.spacing(0.25, 1),
//   borderRadius: theme.spacing(0.5),
//   backgroundColor: '#5a9bd8',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#4a8bc8',
//   },
//   '& .MuiListItemIcon-root': {
//     color: 'white',
//     minWidth: 40
//   }
// }));

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   position: 'absolute',
//   right: -12,
//   top: '50%',
//   transform: 'translateY(-50%)',
//   backgroundColor: '#fff',
//   border: '1px solid #eaeaea',
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//   '&:hover': {
//     backgroundColor: '#f5f5f5',
//   }
// }));

// export default function LeftMenuMUI({ isOpen = true, setIsOpen }) {
//   const [expandedMenus, setExpandedMenus] = useState({});
//   const [expandedSubMenu, setExpandedSubMenu] = useState({});
//   const location = useLocation();
  
//   const updateDate = "Apr 30, 2025";
//   const currentVersion = "4.3.4.5";

//   const toggleMenu = (menu) => {
//     setExpandedMenus((prevState) => ({
//       [menu]: !prevState[menu],
//     }));
//     setExpandedSubMenu({});
//   };

//   const toggleSubMenu = (menu) => {
//     setExpandedSubMenu((prevState) => ({
//       [menu]: !prevState[menu],
//     }));
//   };

//   const handleNavigation = () => {
//     window.location.replace("https://nimbus.nimbusrms.com/Home");
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const menuItems = [
//     {
//       id: 'dashboard',
//       text: 'Dashboard',
//       icon: <Dashboard />,
//       path: '/app/Home'
//     },
//     {
//       id: 'configuration',
//       text: 'Configurations',
//       icon: <Settings />,
//       children: [
//         { text: 'System Configuration', path: '/app/SystemConfiguration' },
//         { 
//           text: 'Store Configuration', 
//           children: [
//             { text: 'Store Definition', path: '/app/StoreDefinition' },
//             { text: 'Employee Type', path: '/app/EmployeeType' },
//             { text: 'Register', path: '/app/Register' },
//             { text: 'Store Employee', path: '/app/StoreEmployee' }
//           ]
//         },
//         { text: 'Department', path: '/app/LineItem' },
//         { text: 'City', path: '/app/City' },
//         { text: 'City Area', path: '/app/CityArea' },
//         { text: 'Credit Cards Banks', path: '/app/Creditcardbank' },
//         { text: 'Loyalty Club', path: '/app/LoyaltyClub' },
//         { text: 'Setup Online Store', path: '/app/SetupOnlineStore' }
//       ]
//     },
//     {
//       id: 'items',
//       text: 'Items',
//       icon: <Sitemap />,
//       children: [
//         { text: 'Item Definition', path: '/app/ProductDefinition' },
//         { text: 'Import Items Data', path: '/app/ImportItemsData' },
//         { text: 'Update Items Information', path: '/app/UpdateItemsInformation' },
//         { text: 'Item Code Template', path: '/app/ItemCodeTemplate' },
//         { text: 'Item Barcode Printing', path: '/app/ItemBarcodePrinting' },
//         { 
//           text: 'Item Pricing', 
//           children: [
//             { text: 'Change Item Retail Price', path: '/app/ChangeItemRetailPrice' },
//             { text: 'Change Item Cost Price', path: '/app/ChangeItemCostPrice' }
//           ]
//         },
//         { 
//           text: 'Department Based Attributes', 
//           children: [
//             { text: 'Item Group', path: '/app/ItemGroup' },
//             { text: 'DB attribute 1', path: '/app/DBattribute1' },
//             { text: 'DB attribute 2', path: '/app/DBattribute2' },
//             { text: 'Category', path: '/app/Category' },
//             { text: 'Sub Category', path: '/app/SubCategory' }
//           ]
//         },
//         { 
//           text: 'Item Based Attributes', 
//           children: [
//             { text: 'Item attribute 1', path: '/app/Itemattribute1' },
//             { text: 'Item attribute 2', path: '/app/Itemattribute2' },
//             { text: 'Item attribute 3', path: '/app/Itemattribute3' },
//             { text: 'Item attribute 4', path: '/app/Itemattribute4' },
//             { text: 'Item attribute 5', path: '/app/Itemattribute5' }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'sale',
//       text: 'Sale',
//       icon: <ShoppingCart />,
//       children: [
//         { text: 'Sale And Return', path: '/app/SaleAndReturn' },
//         { text: 'Discounts', path: '/app/Discounts' },
//         { text: 'Shift Management', path: '/app/Shift Management' },
//         { text: 'End of Day', path: '/app/EndofDay' },
//         { 
//           text: 'Gift Cards', 
//           children: [
//             { text: 'Gift Card Sales', path: '/app/GiftCardSales' },
//             { text: 'Gift Card Redemption', path: '/app/GiftCardRedemption' }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'inventory',
//       text: 'Inventory MGMT',
//       icon: <Laptop />,
//       children: [
//         { text: 'Stock Count', path: '/app/StockCount' },
//         { text: 'STR (Stock Transfer)', path: '/app/StockTransfer' },
//         { text: 'STR Request', path: '/app/STRRequest' },
//         { text: 'Inventory Adjustment', path: '/app/InventoryAdjustment' },
//         { text: 'Inventory Adjustment Reasons', path: '/app/InventoryAdjustmentReasons' },
//         { text: 'Inventory Levels', path: '/app/InventoryLevels' },
//         { text: 'Item Assemble/Dismantle', path: '/app/ProductAssembly' },
//         { text: 'Item Serial Number', path: '/app/ItemSerialNumber' }
//       ]
//     },
//     {
//       id: 'parties',
//       text: 'Parties',
//       icon: <Groups />,
//       children: [
//         { text: 'Customers', path: '/app/Customers' },
//         { text: 'Customer Type', path: '/app/CustomerType' },
//         { text: 'Customer Opening Balance', path: '/app/CustomerOpeningBalance' },
//         { text: 'Loyalty Points Adjustment', path: '/app/LoyaltyPointsAdjustment' },
//         { text: 'Suppliers', path: '/app/Suppliers' },
//         { text: 'Supplier Opening Balance', path: '/app/SupplierOpeningBalance' }
//       ]
//     },
//     {
//       id: 'accounts',
//       text: 'Accounts',
//       icon: <PieChart />,
//       children: [
//         { text: 'Account Transactions', path: '/app/AccountTransactions' },
//         { text: 'Account Heads', path: '/app/AccountHeads' },
//         { text: 'Customer Receipt', path: '/app/CustomerReceipt' },
//         { text: 'Supplier Payment', path: '/app/SupplierPayment' }
//       ]
//     },
//     {
//       id: 'reports',
//       text: 'Reports',
//       icon: <ShowChart />,
//       children: [
//         { text: 'Sales Report', path: '/app/SalesReport' },
//         { text: 'Inventory Report', path: '/app/InventoryReport' },
//         { text: 'Customer Report', path: '/app/CustomerReport' },
//         { text: 'Supplier Report', path: '/app/SupplierReport' }
//       ]
//     },
//     {
//       id: 'ecommerce',
//       text: 'Ecommerce',
//       icon: <ShoppingBasket />,
//       children: [
//         { text: 'Setup Online Store', path: '/app/SetupOnlineStore' },
//         { text: 'Un-Processed Online Orders', path: '/app/UnProcessedOnlineOrders' },
//         { text: 'Online Order Tracking', path: '/app/OnlineOrderTracking' },
//         { text: 'Online Items Stock', path: '/app/OnlineItemsStock' },
//         { text: 'Online Sales Report', path: '/app/OnlineSalesReport' },
//         { 
//           text: 'Courier Management', 
//           children: [
//             { text: 'Courier Setup', path: '/app/CourierSetup' },
//             { text: 'Courier Tracking', path: '/app/CourierTracking' }
//           ]
//         }
//       ]
//     }
//   ];

//   const renderMenuItem = (item, level = 0) => {
//     if (item.path) {
//       // This is a leaf menu item (has a path)
//       return (
//         <ListItem key={item.text} disablePadding>
//           <MenuItem
//             component={Link}
//             to={item.path}
//             active={isActive(item.path)}
//             sx={{ pl: 2 + level * 2 }}
//           >
//             {level === 0 && item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
//             {isOpen && <ListItemText primary={item.text} />}
//           </MenuItem>
//         </ListItem>
//       );
//     }

//     if (item.children) {
//       // This is a parent menu item (has children)
//       const isExpanded = expandedMenus[item.id] || expandedSubMenu[item.id];
//       const hasSubChildren = item.children.some(child => child.children);
      
//       return (
//         <Box key={item.text}>
//           <ListItem disablePadding>
//             <MenuItem
//               onClick={() => hasSubChildren ? toggleMenu(item.id) : toggleSubMenu(item.id)}
//               sx={{ pl: 2 + level * 2 }}
//             >
//               {level === 0 && item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
//               {isOpen && (
//                 <>
//                   <ListItemText primary={item.text} />
//                   {isExpanded ? <ChevronRight /> : <ChevronLeft />}
//                 </>
//               )}
//             </MenuItem>
//           </ListItem>
          
//           <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {item.children.map((child) => renderMenuItem(child, level + 1))}
//             </List>
//           </Collapse>
//         </Box>
//       );
//     }

//     return null;
//   };

//   return (
//     <StyledDrawer
//       variant="permanent"
//       open={isOpen}
//     >
//       <DrawerHeader>
//         <LogoContainer onClick={handleNavigation}>
//           <Logo
//             src="data:image/png;base64,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"
//             alt="Nimbus Logo"
//           />
//         </LogoContainer>
        
//         <ToggleButton
//           onClick={() => setIsOpen(!isOpen)}
//           size="small"
//         >
//           {isOpen ? <ChevronLeft /> : <ChevronRight />}
//         </ToggleButton>
//       </DrawerHeader>

//       <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
//         <List>
//           {menuItems.map((item) => renderMenuItem(item))}
//         </List>
        
//         {isOpen && (
//           <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #eaeaea' }}>
//             <Typography variant="caption" color="text.secondary" display="block">
//               Version: {currentVersion}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" display="block">
//               Updated on: {updateDate}
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </StyledDrawer>
//   );
// }

# Nimbus Kit - Component Library Documentation

## Overview

Nimbus Kit is a comprehensive React component library designed for building modern web applications. It provides a wide range of pre-built components, utilities, and services to accelerate development while maintaining consistency and best practices.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Component Categories](#component-categories)
   - [Form Controls](#form-controls)
   - [Buttons](#buttons)
   - [Popups & Modals](#popups--modals)
   - [Navigation](#navigation)
   - [Data Display](#data-display)
   - [Utilities](#utilities)
4. [Services](#services)
5. [Custom Hooks](#custom-hooks)
6. [Styling](#styling)
7. [Examples](#examples)

## Installation

### Prerequisites

Make sure you have the following peer dependencies installed in your project:

```bash
npm install @emotion/react @emotion/styled @mui/icons-material @mui/material axios date-fns dexie dexie-react-hooks framer-motion html2canvas idb js-cookie jwt-decode react react-bootstrap react-datepicker react-dom react-icons react-router-dom react-redux react-select react-toastify react-tooltip
```

### Install Nimbus Kit

```bash
npm install nimbus-kit
```

## Quick Start

```jsx
import React from 'react';
import { Input, SaveCancelBtn, ConfirmationPopup } from 'nimbus-kit';
import 'nimbus-kit/dist/index.css'; // Import the CSS file

function MyComponent() {
  const [inputValue, setInputValue] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);

  const handleSave = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    setInputValue('');
  };

  const handleConfirm = () => {
    // Save logic here
    setShowModal(false);
  };

  return (
    <div>
      <Input
        label="Enter your name"
        inputVal={inputValue}
        setInputVal={setInputValue}
        placeholder="Type here..."
      />
      
      <SaveCancelBtn
        handleSave={handleSave}
        handleReset={handleReset}
      />
      
      {showModal && (
        <ConfirmationPopup
          setShowModal={setShowModal}
          onConfirm={handleConfirm}
          modalTitle="Confirm Action"
          modalBody="Are you sure you want to save this data?"
        />
      )}
    </div>
  );
}
```

## Component Categories

### Form Controls

#### Input Components

##### Input
A versatile text input component with validation and styling options.

```jsx
import { Input } from 'nimbus-kit';

<Input
  label="Username"
  name="username"
  inputVal={username}
  setInputVal={setUsername}
  placeholder="Enter username"
  important="true"
  disable={false}
  maxLength={50}
  customClass="my-input-class"
  customInputClass="custom-style"
/>
```

**Props:**
- `label` (string): Label text for the input
- `name` (string): Input name attribute
- `inputVal` (string): Current input value
- `setInputVal` (function): Function to update input value
- `placeholder` (string): Placeholder text
- `important` (string): Highlights input with yellow background
- `disable` (boolean): Disables the input
- `maxLength` (number): Maximum character limit
- `customClass` (string): Custom CSS class for container
- `customInputClass` (string): Custom CSS class for input element
- `infoIconBody` (string): Tooltip content for info icon

##### InputNumber
Specialized input for numeric values with validation.

```jsx
import { InputNumber } from 'nimbus-kit';

<InputNumber
  label="Quantity"
  inputVal={quantity}
  setInputVal={setQuantity}
  placeholder="Enter quantity"
  disable={false}
/>
```

##### InputPassword
Password input with security features.

```jsx
import { InputPassword } from 'nimbus-kit';

<InputPassword
  label="Password"
  inputVal={password}
  setInputVal={setPassword}
  placeholder="Enter password"
/>
```

##### InputComment
Multi-line text input for comments and descriptions.

```jsx
import { InputComment } from 'nimbus-kit';

<InputComment
  label="Comments"
  inputVal={comments}
  setInputVal={setComments}
  placeholder="Enter your comments..."
  rows={4}
/>
```

##### ItemCodeInput
Specialized input for item codes with auto-completion features.

```jsx
import { ItemCodeInput } from 'nimbus-kit';

<ItemCodeInput
  label="Item Code"
  inputVal={itemCode}
  setInputVal={setItemCode}
  onItemSelect={handleItemSelect}
/>
```

#### Date Components

##### DatePicker
Advanced date picker with custom styling and keyboard navigation.

```jsx
import { DatePicker } from 'nimbus-kit';

<DatePicker
  startDate={selectedDate}
  setStartDate={setSelectedDate}
  toCaption="Select Date"
  disableDateChange={false}
  clearAble={true}
  customClass="my-datepicker"
/>
```

**Props:**
- `startDate` (Date): Selected date value
- `setStartDate` (function): Function to update selected date
- `toCaption` (string): Label text
- `disableDateChange` (boolean): Disables date selection
- `clearAble` (boolean): Shows clear button
- `customClass` (string): Custom CSS class

##### DateRangePicker
Date range selection component.

```jsx
import { DateRangePicker } from 'nimbus-kit';

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  setStartDate={setStartDate}
  setEndDate={setEndDate}
  toCaption="Select Date Range"
/>
```

#### Selection Components

##### OptionSelection
Dropdown selection component with search functionality.

```jsx
import { OptionSelection } from 'nimbus-kit';

<OptionSelection
  label="Select Category"
  options={categoryOptions}
  selectedValue={selectedCategory}
  setSelectedValue={setSelectedCategory}
  placeholder="Choose a category"
  isSearchable={true}
/>
```

##### OptionSelectorTopMenu
Top menu style dropdown selector.

```jsx
import { OptionSelectorTopMenu } from 'nimbus-kit';

<OptionSelectorTopMenu
  options={menuOptions}
  selectedValue={selectedOption}
  setSelectedValue={setSelectedOption}
/>
```

#### Radio Buttons and Checkboxes

##### CheckBox
Standard checkbox component.

```jsx
import { CheckBox } from 'nimbus-kit';

<CheckBox
  label="Accept Terms"
  checked={isChecked}
  onChange={setIsChecked}
  disable={false}
/>
```

##### CheckBoxWhite
White themed checkbox variant.

```jsx
import { CheckBoxWhite } from 'nimbus-kit';

<CheckBoxWhite
  label="Subscribe to newsletter"
  checked={isSubscribed}
  onChange={setIsSubscribed}
/>
```

##### RadioButton
Radio button component for single selection.

```jsx
import { RadioButton } from 'nimbus-kit';

<RadioButton
  label="Payment Method"
  options={paymentOptions}
  selectedValue={selectedPayment}
  setSelectedValue={setSelectedPayment}
  name="payment"
/>
```

##### CustomRadioButton
Custom styled radio button component.

```jsx
import { CustomRadioButton } from 'nimbus-kit';

<CustomRadioButton
  label="Theme"
  options={themeOptions}
  selectedValue={selectedTheme}
  setSelectedValue={setSelectedTheme}
/>
```

##### LanguageRadio
Language selection radio button component.

```jsx
import { LanguageRadio } from 'nimbus-kit';

<LanguageRadio
  selectedLanguage={language}
  setSelectedLanguage={setLanguage}
  languages={availableLanguages}
/>
```

### Buttons

#### SaveCancelBtn
Standard save and cancel button pair with keyboard shortcuts.

```jsx
import { SaveCancelBtn } from 'nimbus-kit';

<SaveCancelBtn
  handleSave={handleSave}
  handleReset={handleReset}
  loading={isLoading}
  hideCancel={false}
  disableSave={false}
  showUnderLine={true}
/>
```

**Props:**
- `handleSave` (function): Save button click handler
- `handleReset` (function): Cancel/Reset button click handler
- `loading` (boolean): Shows loading spinner on save button
- `hideCancel` (boolean): Hides the cancel button
- `disableSave` (boolean): Disables the save button
- `showUnderLine` (boolean): Shows keyboard shortcut hints

**Keyboard Shortcuts:**
- `F8` or `Alt + S`: Save
- `Alt + D`: Cancel (in confirmation dialogs)

#### UpdateCancelBtn
Update and cancel button pair for editing operations.

```jsx
import { UpdateCancelBtn } from 'nimbus-kit';

<UpdateCancelBtn
  handleUpdate={handleUpdate}
  handleCancel={handleCancel}
  loading={isUpdating}
/>
```

#### SaveUpdateBtn
Combined save/update button that changes based on context.

```jsx
import { SaveUpdateBtn } from 'nimbus-kit';

<SaveUpdateBtn
  handleSave={handleSave}
  handleUpdate={handleUpdate}
  isEditMode={isEditMode}
  loading={isLoading}
/>
```

#### SearchResetBtn
Search and reset button pair for search operations.

```jsx
import { SearchResetBtn } from 'nimbus-kit';

<SearchResetBtn
  handleSearch={handleSearch}
  handleReset={handleReset}
  loading={isSearching}
/>
```

#### ToggleBtn
Toggle button component for binary states.

```jsx
import { ToggleBtn } from 'nimbus-kit';

<ToggleBtn
  isActive={isActive}
  onToggle={setIsActive}
  activeText="Enabled"
  inactiveText="Disabled"
/>
```

#### PrintMenuBtn
Print functionality button with menu options.

```jsx
import { PrintMenuBtn } from 'nimbus-kit';

<PrintMenuBtn
  onPrint={handlePrint}
  printOptions={printOptions}
  disabled={false}
/>
```

### Popups & Modals

#### ConfirmationPopup
Standard confirmation dialog with keyboard navigation.

```jsx
import { ConfirmationPopup } from 'nimbus-kit';

<ConfirmationPopup
  setShowModal={setShowModal}
  onClose={handleClose}
  onConfirm={handleConfirm}
  modalTitle="Confirm Delete"
  modalBody="Are you sure you want to delete this item?"
  showExtraText={false}
  additionalText=""
/>
```

**Props:**
- `setShowModal` (function): Function to control modal visibility
- `onClose` (function): Close button handler
- `onConfirm` (function): Confirm button handler
- `modalTitle` (string): Modal title
- `modalBody` (string): Main modal content
- `showExtraText` (boolean): Shows additional text section
- `additionalText` (string): Additional information text

**Keyboard Navigation:**
- `Escape`: Close modal
- `Arrow Left/Right`: Switch between buttons
- `F8/F7`: Focus Yes button
- `Alt + D`: Focus No button

#### InformationPopup
Information display modal.

```jsx
import { InformationPopup } from 'nimbus-kit';

<InformationPopup
  setShowModal={setShowModal}
  modalTitle="Information"
  modalBody="Your operation was successful!"
  onClose={handleClose}
/>
```

#### InformationPopupSmall
Compact information popup for brief messages.

```jsx
import { InformationPopupSmall } from 'nimbus-kit';

<InformationPopupSmall
  setShowModal={setShowModal}
  message="Data saved successfully!"
/>
```

#### CustomInformationPopup
Customizable information popup with additional styling options.

```jsx
import { CustomInformationPopup } from 'nimbus-kit';

<CustomInformationPopup
  setShowModal={setShowModal}
  modalTitle="Custom Info"
  modalBody="Custom message content"
  customStyle="success"
/>
```

#### ConfirmationPopupWithCustomText
Confirmation popup with custom button text.

```jsx
import { ConfirmationPopupWithCustomText } from 'nimbus-kit';

<ConfirmationPopupWithCustomText
  setShowModal={setShowModal}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  modalTitle="Custom Confirmation"
  modalBody="Are you sure?"
  confirmText="Proceed"
  cancelText="Go Back"
/>
```

#### MailPopup
Email composition popup with attachment support.

```jsx
import { MailPopup } from 'nimbus-kit';

<MailPopup
  setShowModal={setShowModal}
  onSend={handleSendEmail}
  recipients={["user@example.com"]}
  subject="Default Subject"
  body="Default message body"
/>
```

#### CustomerHelpPopup
Customer help and support popup.

```jsx
import { CustomerHelpPopup } from 'nimbus-kit';

<CustomerHelpPopup
  setShowModal={setShowModal}
  helpContent={helpText}
  contactInfo={contactDetails}
/>
```

#### CustomerAutoCompleteDropDown
Customer selection with auto-complete functionality.

```jsx
import { CustomerAutoCompleteDropDown } from 'nimbus-kit';

<CustomerAutoCompleteDropDown
  selectedCustomer={customer}
  setSelectedCustomer={setCustomer}
  customers={customerList}
  placeholder="Search customers..."
/>
```

#### PaidFeatureWarningPopup
Warning popup for paid features.

```jsx
import { PaidFeatureWarningPopup } from 'nimbus-kit';

<PaidFeatureWarningPopup
  setShowModal={setShowModal}
  featureName="Advanced Reports"
  onUpgrade={handleUpgrade}
/>
```

#### SessionExpiredPopup
Session expiration warning popup.

```jsx
import { SessionExpiredPopup } from 'nimbus-kit';

<SessionExpiredPopup
  setShowModal={setShowModal}
  onRenew={handleRenewSession}
  onLogout={handleLogout}
/>
```

### Navigation

#### LeftMenu
Side navigation menu component.

```jsx
import { LeftMenu } from 'nimbus-kit';

<LeftMenu
  menuItems={menuItems}
  selectedItem={selectedMenuItem}
  onItemSelect={setSelectedMenuItem}
  isCollapsed={false}
/>
```

#### LeftMenuList
List-based left menu variant.

```jsx
import { LeftMenuList } from 'nimbus-kit';

<LeftMenuList
  items={menuItems}
  activeItem={activeItem}
  onItemClick={handleItemClick}
/>
```

#### LeftMenuTop
Top section of left menu with branding/logo.

```jsx
import { LeftMenuTop } from 'nimbus-kit';

<LeftMenuTop
  logo="path/to/logo.png"
  title="Application Name"
  onLogoClick={handleLogoClick}
/>
```

#### Tabs
Tab navigation component.

```jsx
import { Tabs } from 'nimbus-kit';

<Tabs
  tabs={tabItems}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  className="my-tabs"
/>
```

#### RelatedOperationsMenu
Context menu for related operations.

```jsx
import { RelatedOperationsMenu } from 'nimbus-kit';

<RelatedOperationsMenu
  operations={relatedOperations}
  onOperationSelect={handleOperation}
  trigger={<button>Actions</button>}
/>
```

#### RightDrawer
Sliding right-side drawer component.

```jsx
import { RightDrawer } from 'nimbus-kit';

<RightDrawer
  isOpen={isDrawerOpen}
  onClose={setIsDrawerOpen}
  title="Drawer Title"
  content={drawerContent}
/>
```

### Data Display

#### RecordGrid
Data grid component for displaying tabular data.

```jsx
import { RecordGrid } from 'nimbus-kit';

<RecordGrid
  data={gridData}
  columns={columnDefinitions}
  onRowSelect={handleRowSelect}
  onSort={handleSort}
  pagination={true}
  searchable={true}
/>
```

#### Pagination Components

##### Pagination
Standard pagination component.

```jsx
import { PaginationComp } from 'nimbus-kit';

<PaginationComp
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={totalItems}
/>
```

##### GridPagination
Pagination specifically designed for grid layouts.

```jsx
import { GridPaginationComp } from 'nimbus-kit';

<GridPaginationComp
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showPageSize={true}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
/>
```

##### PopupPagination
Pagination component for popup/modal contexts.

```jsx
import { PopupPaginationComp } from 'nimbus-kit';

<PopupPaginationComp
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  compact={true}
/>
```

### File Handling

#### FileLoader
File upload component with drag-and-drop support.

```jsx
import { FileLoader } from 'nimbus-kit';

<FileLoader
  onFileSelect={handleFileSelect}
  acceptedTypes={['.csv', '.xlsx', '.pdf']}
  maxFileSize={5 * 1024 * 1024} // 5MB
  multiple={false}
  label="Upload File"
/>
```

#### InventoryFileLoader
Specialized file loader for inventory data.

```jsx
import { InventoryFileLoader } from 'nimbus-kit';

<InventoryFileLoader
  onFileSelect={handleInventoryFile}
  onProcess={handleProcessInventory}
  templateUrl="/templates/inventory-template.xlsx"
/>
```

### UI Components

#### ShowHideContainer
Collapsible container with show/hide functionality.

```jsx
import { ShowHideContainer } from 'nimbus-kit';

<ShowHideContainer
  title="Advanced Options"
  isOpen={showAdvanced}
  onToggle={setShowAdvanced}
  children={advancedContent}
/>
```

#### Tooltip Components

##### Tooltip
Custom tooltip component.

```jsx
import { Tooltip } from 'nimbus-kit';

<Tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</Tooltip>
```

##### InfoIcon
Information icon with tooltip.

```jsx
import { InfoIcon } from 'nimbus-kit';

<InfoIcon body="Additional information about this field">
  <span>Field Label</span>
</InfoIcon>
```

#### VideoPopup
Video player popup component.

```jsx
import { VideoPopup } from 'nimbus-kit';

<VideoPopup
  setShowModal={setShowModal}
  videoUrl="path/to/video.mp4"
  title="Video Title"
  autoplay={false}
/>
```

## Services

### API Service

The `apiService` provides a standardized way to make HTTP requests with automatic token handling.

```jsx
import { apiService } from 'nimbus-kit';

// GET request
const response = await apiService({
  endpoint: '/api/users',
  method: 'GET',
  data: { page: 1, limit: 10 } // query parameters for GET
});

// POST request
const response = await apiService({
  endpoint: '/api/users',
  method: 'POST',
  data: { name: 'John Doe', email: 'john@example.com' },
  contentType: 'application/json'
});

// PUT request
const response = await apiService({
  endpoint: '/api/users/123',
  method: 'PUT',
  data: { name: 'Jane Doe' }
});

// DELETE request
const response = await apiService({
  endpoint: '/api/users/123',
  method: 'DELETE'
});
```

**Parameters:**
- `endpoint` (string): API endpoint URL
- `method` (string): HTTP method (GET, POST, PUT, DELETE)
- `data` (object): Request data (query params for GET, body for others)
- `contentType` (string): Content-Type header (default: "application/json")

### IndexDB Services

The IndexDB services provide offline data storage and synchronization capabilities.

#### Database Initialization

```jsx
import { initDb } from 'nimbus-kit';

// Initialize the database
await initDb();
```

#### Data Synchronization

```jsx
import { syncIndexDb, syncUpdateDataIndexDb } from 'nimbus-kit';

// Sync data from server
await syncIndexDb(serverData, companyId);

// Update existing data
await syncUpdateDataIndexDb(updateData);
```

#### Data Operations

```jsx
import { 
  getTableData, 
  addDataIndexDb, 
  updateDataIndexDb, 
  deleteDataIndexDb,
  getTableDataByKey,
  getDataForDropDown
} from 'nimbus-kit';

// Get all data from a table
const products = await getTableData('product');

// Get specific record by key
const product = await getTableDataByKey('product', 'productId', 123);

// Add new data
await addDataIndexDb('product', [newProduct1, newProduct2]);

// Update existing data
await updateDataIndexDb('product', 'productId', 123, updatedProduct);

// Delete data
await deleteDataIndexDb([{ key: 'product', value: productsToDelete }]);

// Get data formatted for dropdown
const dropdownOptions = await getDataForDropDown('category', 'categoryId', 'categoryName');
```

#### Specialized Functions

```jsx
import { checkExistance, addUpdateGRNIndexDb } from 'nimbus-kit';

// Check if data exists
const hasData = await checkExistance();

// Add/Update GRN (Goods Received Note) data
await addUpdateGRNIndexDb(grnModel);
```

### Email Service

```jsx
import { sendEmail } from 'nimbus-kit';

const emailResult = await sendEmail({
  to: ['user@example.com'],
  subject: 'Test Email',
  body: 'This is a test email',
  attachments: [fileBlob]
});
```

## Custom Hooks

### useGetAllDataOfTable

Hook for fetching all data from a specific table.

```jsx
import { useGetAllDataOfTable } from 'nimbus-kit';

function MyComponent() {
  const { data, loading, error, refetch } = useGetAllDataOfTable('product');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### useGetTokenValue

Hook for accessing authentication tokens.

```jsx
import { useGetTokenValue } from 'nimbus-kit';

function MyComponent() {
  const token = useGetTokenValue();
  
  return (
    <div>
      {token ? 'Logged in' : 'Not logged in'}
    </div>
  );
}
```

## Utilities

### Number Formatting

#### thousandformater

Format numbers with thousand separators and decimal places.

```jsx
import { thousandformater } from 'nimbus-kit';

// Basic usage
const formatted = thousandformater(1234567.89); // "1,234,567.89"

// With custom decimal places
const formatted2 = thousandformater(1234567.89, 3); // "1,234,567.890"

// With custom locale
const formatted3 = thousandformater(1234567.89, 2, "de-DE"); // "1.234.567,89"

// Handle null/undefined
const formatted4 = thousandformater(null); // ""
```

### Date Parsing

#### dateParser

Parse and format dates consistently.

```jsx
import { dateParser } from 'nimbus-kit';

// Parse various date formats
const parsedDate = dateParser("2024-01-15"); // Date object
const formattedDate = dateParser("2024-01-15", "DD/MM/YYYY"); // "15/01/2024"
```

## Styling

### CSS Classes

The component library includes a comprehensive CSS file that provides:

- **Consistent spacing and typography**
- **Responsive design patterns**
- **Animation and transition effects**
- **Theme support**
- **Accessibility features**

### Custom Styling

You can customize components using:

1. **Custom CSS Classes**: Pass `customClass` or `customInputClass` props
2. **Inline Styles**: Use the `style` prop where available
3. **CSS Variables**: Override CSS custom properties
4. **Theme Override**: Modify the base CSS file

### Responsive Design

All components are built with mobile-first responsive design:

- **Breakpoints**: 768px (mobile), 1024px (tablet), 1200px (desktop)
- **Touch-friendly**: Optimized for touch interactions
- **Keyboard Navigation**: Full keyboard accessibility support

## Examples

### Complete Form Example

```jsx
import React, { useState } from 'react';
import {
  Input,
  InputNumber,
  DatePicker,
  OptionSelection,
  CheckBox,
  SaveCancelBtn,
  ConfirmationPopup,
  InformationPopup
} from 'nimbus-kit';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    birthDate: null,
    department: '',
    isActive: false
  });
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const departments = [
    { value: 'it', label: 'Information Technology' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const handleSave = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        age: '',
        birthDate: null,
        department: '',
        isActive: false
      });
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      birthDate: null,
      department: '',
      isActive: false
    });
  };

  return (
    <div className="user-form">
      <h2>User Registration</h2>
      
      <Input
        label="Full Name"
        name="name"
        inputVal={formData.name}
        setInputVal={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Enter full name"
        important="true"
      />
      
      <Input
        label="Email"
        name="email"
        inputVal={formData.email}
        setInputVal={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Enter email address"
        important="true"
      />
      
      <InputNumber
        label="Age"
        inputVal={formData.age}
        setInputVal={(e) => setFormData({...formData, age: e.target.value})}
        placeholder="Enter age"
      />
      
      <DatePicker
        startDate={formData.birthDate}
        setStartDate={(date) => setFormData({...formData, birthDate: date})}
        toCaption="Birth Date"
        clearAble={true}
      />
      
      <OptionSelection
        label="Department"
        options={departments}
        selectedValue={formData.department}
        setSelectedValue={(value) => setFormData({...formData, department: value})}
        placeholder="Select department"
      />
      
      <CheckBox
        label="Active User"
        checked={formData.isActive}
        onChange={(checked) => setFormData({...formData, isActive: checked})}
      />
      
      <SaveCancelBtn
        handleSave={handleSave}
        handleReset={handleReset}
        loading={loading}
        showUnderLine={true}
      />
      
      {showConfirm && (
        <ConfirmationPopup
          setShowModal={setShowConfirm}
          onConfirm={handleConfirm}
          modalTitle="Confirm Save"
          modalBody="Are you sure you want to save this user information?"
        />
      )}
      
      {showSuccess && (
        <InformationPopup
          setShowModal={setShowSuccess}
          modalTitle="Success"
          modalBody="User information saved successfully!"
        />
      )}
    </div>
  );
}

export default UserForm;
```

### Data Grid with Pagination Example

```jsx
import React, { useState, useEffect } from 'react';
import {
  RecordGrid,
  GridPaginationComp,
  SearchResetBtn,
  Input,
  ConfirmationPopup
} from 'nimbus-kit';

function DataTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department' },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  useEffect(() => {
    // Filter data based on search term
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [data, searchTerm]);

  const handleSearch = () => {
    // Search logic is handled in useEffect
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedRows([]);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Remove selected rows from data
      const updatedData = data.filter(item => !selectedRows.includes(item.id));
      setData(updatedData);
      setSelectedRows([]);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="data-table">
      <div className="table-controls">
        <Input
          label="Search"
          inputVal={searchTerm}
          setInputVal={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
        />
        
        <SearchResetBtn
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
        
        {selectedRows.length > 0 && (
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
      </div>
      
      <RecordGrid
        data={currentData}
        columns={columns}
        onRowSelect={setSelectedRows}
        selectedRows={selectedRows}
        loading={loading}
      />
      
      <GridPaginationComp
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        totalItems={filteredData.length}
        showPageSize={true}
      />
      
      {showDeleteConfirm && (
        <ConfirmationPopup
          setShowModal={setShowDeleteConfirm}
          onConfirm={handleConfirmDelete}
          modalTitle="Confirm Delete"
          modalBody={`Are you sure you want to delete ${selectedRows.length} selected items?`}
        />
      )}
    </div>
  );
}

export default DataTable;
```

### Offline Data Management Example

```jsx
import React, { useState, useEffect } from 'react';
import {
  initDb,
  syncIndexDb,
  getTableData,
  addDataIndexDb,
  updateDataIndexDb,
  deleteDataIndexDb,
  useGetAllDataOfTable
} from 'nimbus-kit';

function OfflineManager() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('idle');
  const { data: localData, refetch } = useGetAllDataOfTable('product');

  useEffect(() => {
    // Initialize database on component mount
    initDb();
    
    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setSyncStatus('syncing');
    try {
      // Fetch data from server
      const serverData = await fetch('/api/products').then(r => r.json());
      
      // Sync with local database
      await syncIndexDb(serverData, 'company123');
      
      // Refresh local data
      await refetch();
      
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await addDataIndexDb('product', [productData]);
      await refetch();
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  const handleUpdateProduct = async (productId, updateData) => {
    try {
      await updateDataIndexDb('product', 'productId', productId, updateData);
      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDataIndexDb([{
        key: 'product',
        value: [{ productId }]
      }]);
      await refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="offline-manager">
      <div className="sync-status">
        <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
        
        <button 
          onClick={handleSync}
          disabled={!isOnline || syncStatus === 'syncing'}
          className="btn btn-primary"
        >
          {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Data'}
        </button>
        
        {syncStatus === 'success' && (
          <span className="text-success">✓ Sync completed</span>
        )}
        {syncStatus === 'error' && (
          <span className="text-danger">✗ Sync failed</span>
        )}
      </div>
      
      <div className="data-list">
        <h3>Local Products ({localData?.length || 0})</h3>
        {localData?.map(product => (
          <div key={product.productId} className="product-item">
            <span>{product.productName}</span>
            <div className="actions">
              <button onClick={() => handleUpdateProduct(product.productId, product)}>
                Update
              </button>
              <button onClick={() => handleDeleteProduct(product.productId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfflineManager;
```

## Best Practices

### 1. Component Composition

```jsx
// Good: Compose components for complex forms
function UserRegistrationForm() {
  return (
    <form>
      <Input label="Name" {...nameProps} />
      <DatePicker {...dateProps} />
      <SaveCancelBtn {...buttonProps} />
    </form>
  );
}

// Avoid: Creating monolithic components
function EverythingComponent() {
  // Don't put everything in one component
}
```

### 2. State Management

```jsx
// Good: Use controlled components
function ControlledInput() {
  const [value, setValue] = useState('');
  return <Input inputVal={value} setInputVal={setValue} />;
}

// Good: Group related state
function FormState() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
}
```

### 3. Error Handling

```jsx
// Good: Handle errors gracefully
function ApiCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleApiCall = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService({ endpoint: '/api/data' });
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
}
```

### 4. Accessibility

```jsx
// Good: Provide proper labels and ARIA attributes
<Input
  label="Username"
  name="username"
  aria-describedby="username-help"
  important="true" // Highlights required fields
/>

// Good: Use semantic HTML and keyboard navigation
<SaveCancelBtn
  showUnderLine={true} // Shows keyboard shortcuts
  loading={isLoading}
/>
```

### 5. Performance

```jsx
// Good: Memoize expensive operations
const MemoizedComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);
  
  return <RecordGrid data={processedData} onUpdate={onUpdate} />;
});

// Good: Use pagination for large datasets
<GridPaginationComp
  currentPage={currentPage}
  totalPages={totalPages}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
/>
```

## Troubleshooting

### Common Issues

1. **Components not rendering**
   - Ensure you've imported the CSS: `import 'nimbus-kit/dist/index.css'`
   - Check that all peer dependencies are installed
   - Verify React version compatibility (16.8+)

2. **Styling issues**
   - Check for CSS conflicts with existing styles
   - Ensure proper CSS class names are being applied
   - Verify responsive breakpoints

3. **API Service errors**
   - Check that `localStorage.AccessToken` is set
   - Verify endpoint URLs are correct
   - Handle error responses properly

4. **IndexDB issues**
   - Ensure database is initialized with `initDb()`
   - Check browser IndexDB support
   - Handle quota exceeded errors

### Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

import Select, { components } from "react-select";
import { useState, useEffect } from "react";
import {getTableData} from "../../IndexDbServices/indexDbServices";


const CustomerAutoCompleteDropDown = ({ 
  handleSelection, 
  label = "Customer",
  setShowModal,
  value,
  showCredit = false
}) => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allShops, setAllShops] = useState([]);


  // Get data from IndexedDB
  useEffect(() => {
    fetchAllCustomers();
    fetchAllShops();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const data = await getTableData("memberInfo");
        let filteredData = data;
        if (showCredit === true) {
        filteredData = data.filter(member =>
        member.allowCredit === true
        );
      }
      setAllCustomers(filteredData || []);
    } catch (error) {
      console.error("Error fetching MemberInfo:", error);
      setAllCustomers([]);
    }
  };

  const fetchAllShops = async () => {
    try {
      const data = await getTableData("shop");
      setAllShops(data || []);
    } catch (error) {
      console.error("Error fetching Shop:", error);
      setAllShops([]);
    }
  };

  // Generate receipt number in format: ShopMembershipCode-MemberNo-CardDuplicateNo
  const generateReceiptNumber = (customer) => {
    if (!customer || !allShops || allShops.length === 0) return '';
    
    const shop = allShops.find(s => s.shopId === customer.shopId);
    if (!shop || !shop.shopMembershipCode) return '';
    
    const shopCode = shop.shopMembershipCode.toString().padStart(3, '0');
    const memberNo = (customer.memberNo || 0).toString().padStart(6, '0');
    const cardDuplicateNo = (customer.cardDuplicateNo || 0).toString().padStart(2, '0');
    
    const receiptNumber = `${shopCode}-${memberNo}-${cardDuplicateNo}`;
    return receiptNumber;
  };

  // Create options for react-select
  const options = allCustomers.map((customer) => ({
    ...customer,
    value: customer.memberId,
    label: customer.memberName || 'Unknown Customer',
    receiptNumber: generateReceiptNumber(customer)
  }));

  const handleInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setQuery(inputValue);
    }
    return inputValue;
  };

  const handleChange = (selected) => {
    setQuery(""); 
    if (selected) {
      let customerMatch = allCustomers.find(
        (item) => item.memberId === selected.value
      );
      handleSelection(customerMatch);
      setSelectedOption({
        ...selected,
        label: selected.receiptNumber
      });
    } else {
      setSelectedOption(null);
    }
  };
  
  

  const handleNoMatch = (e) => {
    if (e.key === "Enter") {
      let input = query;
      setQuery("");
      setSelectedOption(null);
  
      const normalize = (str) =>
        (str || "")
          .toString()
          .toLowerCase()
          .replace(/[-\s]/g, "");
  
      const search = normalize(input);
  
      const match = options.find(
        (item) =>
          normalize(item.label).includes(search) ||
          normalize(item.receiptNumber).includes(search)
      );
  
      if (match) {
        let customerMatch = allCustomers.find(
          (item) => item.memberId === match.value
        );
        handleSelection(customerMatch);
        setSelectedOption({
            ...match,
            label: match.receiptNumber 
          });
      }
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <div className={`dropdown-wrapper autoCompleteCustomerInputField`} style={{ flex: 1 }}>
        <Select
          classNamePrefix={"customerAutoComplete"}
          options={options}
          value={selectedOption}
          onInputChange={handleInputChange}
          onChange={handleChange}
          placeholder="Enter customer code or name"
          onBlur={() => {
            setQuery("");
          }}
          onKeyDown={(e) => handleNoMatch(e)}
          formatOptionLabel={(customer, { context }) => {
            if (context === "value") {
              return customer.receiptNumber;
            }
            return (
              <div>
                <span
                  className="auto_complete_name"
                  style={{ marginRight: "21px" }}
                >
                  {customer.memberName || "Unknown Customer"}
                </span>
                <br />
                <span className="auto_complete_name auto_complete_label">
                  {customer.receiptNumber}
                </span>
              </div>
            );
          }}
          
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 1000,
              maxHeight: '170px', 
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: '170px', 
              overflowY: 'auto',  
            }),
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          autoFocus={false}
          blurInputOnSelect={true}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          isClearable={true}
          isSearchable={true}
          menuShouldScrollIntoView={true}
          noOptionsMessage={() => "No customers found"}
          openMenuOnClick={false}
          openMenuOnFocus={false}
          tabSelectsValue={false}
          filterOption={(option, inputValue) => {
            if (!inputValue) return false;
          
            const normalize = (str) =>
              (str || "")
                .toString()
                .toLowerCase()
                .replace(/[-\s]/g, "");
          
            const name = normalize(option.data.memberName);       
            const receipt = normalize(option.data.receiptNumber); 
            const search = normalize(inputValue);
          
            return name.includes(search) || receipt.includes(search);
          }}
          
          
          
        />
        <div className="custom-label">{label}</div>
      </div>
    </div>
  );
};

export default CustomerAutoCompleteDropDown;

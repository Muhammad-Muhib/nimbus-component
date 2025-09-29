import { useState, useEffect } from "react";
import { getTableData } from "../../IndexDbServices/indexDbServices";
import { toast } from "react-toastify";

const CustomerAutoCompleteInput = ({ 
  handleSelection, 
  label = "Customer",
  setShowModal,
  value,
  showCredit = false,
  handleClearCustomerData,
  inputRef,
  clearQuery = false,
  onInvalidCustomerCode
}) => {
  const [query, setQuery] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(-1); // NEW

  useEffect(() => {
    fetchAllCustomers();
    fetchAllShops();
  }, []);

  useEffect(() => {
    if (value != null) {
      setQuery(value.memberCode);
    }
  }, [value]);

  useEffect(() => {
    if (clearQuery) {
      setQuery("");
      setSelectedCustomer(null);
    }
  }, [clearQuery]);

  const fetchAllCustomers = async () => {
    try {
      const data = await getTableData("memberInfo");
      let filteredData = data;
      if (showCredit) {
        filteredData = data.filter(member => member.allowCredit === true);
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

  const generateReceiptNumber = (customer) => {
    if (!customer || allShops.length === 0) return "";
    const shop = allShops.find(s => s.shopId === customer.shopId);
    if (!shop || !shop.shopMembershipCode) return "";
    
    const shopCode = shop.shopMembershipCode.toString().padStart(3, "0");
    const memberNo = (customer.memberNo || 0).toString().padStart(6, "0");
    const cardDuplicateNo = (customer.cardDuplicateNo || 0).toString().padStart(2, "0");

    return `${shopCode}-${memberNo}-${cardDuplicateNo}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setHighlightIndex(-1); // reset highlight when typing

    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const normalize = (str) =>
      (str || "").toString().toLowerCase().replace(/[-\s]/g, "");

    const search = normalize(inputValue);

    const filtered = allCustomers.filter((c) => {
      const name = normalize(c.memberName);
      const receipt = normalize(generateReceiptNumber(c));
      return name.includes(search) || receipt.includes(search);
    });

    setSuggestions(filtered.slice(0, 10)); // show only top 10
  };

  const validateCustomerCode = (inputValue) => {
    if (!inputValue || inputValue.trim() === "") {
      return true; // Empty input is valid (will be handled by parent)
    }

    // Check if the input matches any customer code or name
    const normalize = (str) =>
      (str || "").toString().toLowerCase().replace(/[-\s]/g, "");

    const search = normalize(inputValue);

    const isValid = allCustomers.some((c) => {
      const name = normalize(c.memberName);
      const receipt = normalize(generateReceiptNumber(c));
      return name === search || receipt === search;
    });

    return isValid;
  };

  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setQuery(generateReceiptNumber(customer)); // show receipt number in input
    setSuggestions([]);
    setHighlightIndex(-1);
    handleSelection(customer);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } 
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
    else if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    }
    else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="autoCompleteCustomerInputField" style={{ position: "relative" }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Enter customer code or name"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", padding: "8px",outline: "none" }}
        onBlur={(e) => {
          const inputValue = e.target.value;
          
          // If input is empty, handle normally
          if (!inputValue || inputValue.trim() === "") {
            handleClearCustomerData(e);
            return;
          }
          
          // Validate customer code
          if (!validateCustomerCode(inputValue)) {
            toast.error("Invalid customer code");
            // Call the callback to reset the parent component
            if (onInvalidCustomerCode) {
              onInvalidCustomerCode();
            }
            // Refocus on the input after a short delay
            setTimeout(() => {
              if (inputRef && inputRef.current) {
                inputRef.current.focus();
              }
            }, 100);
            setQuery("");
            return;
          }
          
          // If valid, handle normally
          handleClearCustomerData(e);
        }}
      />
      <div className="custom-label">{label}</div>

      {suggestions.length > 0 && (
        <ul 
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "white",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
            listStyle: "none",
            margin: 0,
            padding: 0
          }}
        >
          {suggestions.map((customer, index) => (
            <li
              key={customer.memberId}
              onClick={() => handleSelect(customer)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                background: index === highlightIndex ? "#f0f0f0" : "white" // highlight row
              }}
            >
              <strong>{customer.memberName}</strong>
              <br />
              <small>{generateReceiptNumber(customer)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerAutoCompleteInput;
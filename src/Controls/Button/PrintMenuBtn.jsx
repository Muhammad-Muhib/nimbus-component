import React, { useState, useRef, useEffect } from "react";
import { FaPrint, FaChevronUp } from "react-icons/fa";
import CustomTooltip from "../Tooltip/CustomTooltip";

const PrintMenuBtn = ({ options = [], onSelect, className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (value) => {
    onSelect(value);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`detailPrinterContainer d-inline-block ${className}`}
      ref={dropdownRef}
    >
      {/* Dropdown Menu */}
      <div
        className={`dropdown-menu ${
          isDropdownOpen ? "show" : ""
        } position-absolute`}
        style={{
          bottom: "100%",
          left: "100%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
          minWidth: "200px",
          zIndex: 1000,
          marginLeft: "70px",
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            className="dropdown-item d-flex align-items-center px-3 py-2"
            onClick={() => handleOptionClick(option.value)}
            style={{ cursor: "pointer" }}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="d-flex align-items-center footerPrintBtnContainer">
        {/* Print Icon with Tooltip */}
        <CustomTooltip body={"Print"}>
          <FaPrint
            className="detailPrinterIcon"
            size={24}
            onClick={() => onSelect("default")}
          />
        </CustomTooltip>

        {/* Dropdown Arrow Button */}
        <button
          className="printDropdownBtn"
          onClick={toggleDropdown}
          aria-label="Print options"
        >
          <FaChevronUp
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            size={16}
          />
        </button>
      </div>
    </div>
  );
};

export default PrintMenuBtn;

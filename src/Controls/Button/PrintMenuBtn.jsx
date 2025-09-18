import React, { useState, useRef, useEffect } from 'react';
import { FaPrint, FaChevronUp } from 'react-icons/fa';

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
      className={`detailPrinterContainer position-relative d-inline-block ${className}`} 
      ref={dropdownRef}
    >
      {/* Dropdown Menu */}
      <div
        className={`dropdown-menu ${isDropdownOpen ? "show" : ""} position-absolute`}
        style={{
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
          minWidth: "200px",
          zIndex: 1000,
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

      {/* Button Container */}
      <div className="d-flex align-items-center">
        {/* Print Icon Button */}
        <FaPrint
          className="detailPrinterIcon"
          size={30}
          onClick={() => onSelect("default")}
          style={{ cursor: "pointer" }}
        />
        {/* Arrow Button */}
        <button
          className="btn btn-outline-secondary p-1 me-1"
          onClick={toggleDropdown}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "12px",
            width: "20px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Print options"
        >
          <FaChevronUp
            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            size={10}
            style={{
              transition: "transform 0.2s ease",
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "white",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default PrintMenuBtn;
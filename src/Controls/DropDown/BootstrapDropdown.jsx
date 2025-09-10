import React, { useState, useRef, useEffect } from "react";

const BootstrapDropdown = ({
  options = [],
  defaultValue = null,
  onSelect = () => {},
  label = "",
  className = "",
  prefix = "custom", // ✅ class prefix
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options[0]
  );
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // return full object to parent
  };

  // Helper to add prefix
  const prefixed = (name) => `${prefix}-${name}`;

  return (
    <div
      className={`${prefixed("dropdown-container")} ${className}`}
      ref={dropdownRef}
    >
      {/* Label */}
      {label && <label className={prefixed("dropdown-label")}>{label}</label>}

      {/* Dropdown Button */}
      <button
        type="button"
        className={prefixed("dropdown-button")}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption?.label || "Select an option"}</span>
        <svg
          className={`${prefixed("chevron-icon")} ${
            isOpen ? prefixed("rotated") : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={prefixed("dropdown-menu")} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${prefixed("dropdown-item")} ${
                selectedOption?.value === option.value ? prefixed("active") : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BootstrapDropdown;

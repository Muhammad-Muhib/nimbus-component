import React, { useState, useRef, useEffect } from "react";

const BootstrapDropdown = ({
  options = [],       
  defaultValue = null,
  onSelect = () => {},
  label = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
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

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="p-4">
            {/* Dropdown Container */}
            <div className="position-relative" ref={dropdownRef}>
              {/* Label */}
              <label className="custom-dropdown-label d-block">
                {label}
              </label>

              {/* Dropdown Button */}
              <button
                type="button"
                className="custom-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                <span>{selectedOption?.label || "Select an option"}</span>
                <svg
                  className={`chevron-icon ${isOpen ? "rotated" : ""}`}
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
                <div className="custom-dropdown-menu" role="listbox">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`custom-dropdown-item ${
                        selectedOption?.value === option.value ? "active" : ""
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

            {/* Demo Info */}
            <div className="demo-info">
              <p className="mb-2">
                <strong>Selected:</strong>{" "}
                {selectedOption ? JSON.stringify(selectedOption) : "None"}
              </p>
              <small className="text-muted">
                This dropdown displays labels, but returns the full object
                {{ value, label }} when selected.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapDropdown;
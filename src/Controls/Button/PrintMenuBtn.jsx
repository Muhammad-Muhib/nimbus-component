import React, { useState, useRef, useEffect } from 'react';
import { FaPrint, FaChevronUp } from 'react-icons/fa';

const PrintMenuBtn = ({ handlePrint, className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Print options configuration
  const printOptions = [
    { label: 'Print 3 Inch Report', value: '3inch' },
    { label: 'Print A4 Detail Report', value: 'a4detail' },
    { label: 'Print A4 Report', value: 'a4' }
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value) => {
    handlePrint(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`detailPrinterContainer position-relative d-inline-block ${className}`} ref={dropdownRef}>
      {/* Dropdown Menu */}
      <div 
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} position-absolute`}
        style={{
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          minWidth: '200px',
          zIndex: 1000
        }}
      >
        {printOptions.map((option) => (
          <button
            key={option.value}
            className="dropdown-item d-flex align-items-center px-3 py-2"
            onClick={() => handleOptionClick(option.value)}
            style={{ cursor: 'pointer' }}
          >
            <FaPrint className="me-2" size={14} />
            {option.label}
          </button>
        ))}
      </div>

      {/* Button Container */}
      <div className="d-flex align-items-center">
        {/* Arrow Button */}
        <button
          className="btn btn-outline-secondary p-1 me-1"
          onClick={toggleDropdown}
          style={{ 
            border: 'none',
            background: 'transparent',
            fontSize: '12px',
            width: '20px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Print options"
        >
          <FaChevronUp 
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            size={10}
            style={{ 
              transition: 'transform 0.2s ease',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
        </button>

        {/* Print Icon Button */}
        <FaPrint
          className="detailPrinterIcon"
          size={26}
          onClick={() => handlePrint('default')}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage = () => {
  const handlePrint = (type) => {
    console.log(`Printing ${type} report`);
    // Your print logic here based on the type
    switch (type) {
      case '3inch':
        console.log('Rendering 3 inch report...');
        break;
      case 'a4detail':
        console.log('Rendering A4 detail report...');
        break;
      case 'a4':
        console.log('Rendering A4 report...');
        break;
      default:
        console.log('Rendering default report...');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-auto">
          <h4 className="mb-4">Print Dropdown Example</h4>
          <div className="p-4 border rounded bg-light">
            <p className="mb-3">Click the arrow to see print options:</p>
            <PrintDropdown handlePrint={handlePrint} />
          </div>
          <div className="mt-3">
            <small className="text-muted">
              • Click the arrow button to open dropdown<br/>
              • Click outside to close dropdown<br/>
              • Main print icon calls handlePrint('default')
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintMenuBtn;
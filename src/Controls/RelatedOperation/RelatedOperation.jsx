import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaThumbtack } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const RelatedOperationsMenu = ({menuItems,customClass}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const headerRef = useRef(null);
  const pinRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePin = (e) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  const handleMenuItemClick = (path) => {
    if (path !== '#') {
      navigate(path);
    }
    if (!isPinned) {
      setIsMenuOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    // Don't close if menu is pinned
    if (isPinned) return;

    // Don't close if clicking on the menu button, header, or pin icon
    if (
      buttonRef.current?.contains(event.target) ||
      headerRef.current?.contains(event.target) ||
      pinRef.current?.contains(event.target)
    ) {
      return;
    }

    // Close if clicking outside the menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isPinned]);

  return (
    <div className={`related-operations-container ${customClass}`}>
      <Tooltip placement="top" title="Related Operations">
        <span 
          ref={buttonRef}
          className="shortcutKeyContainer" 
          onClick={toggleMenu}
        >
          <FaBars />
        </span>
      </Tooltip>

      {isMenuOpen && (
        <div ref={menuRef} className="related-operations-menu">
          <div ref={headerRef} className="menu-header">
            <span className="menu-title">Related Operations</span>
            <span 
              ref={pinRef}
              className={`pin-icon ${isPinned ? 'pinned' : ''}`}
              onClick={togglePin}
              title={isPinned ? 'Unpin menu' : 'Pin menu'}
            >
              <FaThumbtack />
            </span>
          </div>
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => handleMenuItemClick(item.path)}
              >                
                <span className="menu-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedOperationsMenu;

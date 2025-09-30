import React, { useState, useEffect, useRef } from 'react';
import '../styles/SessionExpiredPopup/SessionExpiredPopup.css';
import { useNavigate } from 'react-router-dom';
export default function SessionExpiredPopup({
  modalTitle = "Session Expired",
  modalBody = "Your session timed out. Click OK to log in again.",
  setShowModal,
  isTokenExpired = false
}) {
  const [addBgColor, setAddBgColor] = useState(true);
  const okRef = useRef();
  const navigate = useNavigate();
  
  // Set appropriate title and message based on scenario
  const displayTitle = isTokenExpired ? "Token Expired" : modalTitle;
  const displayMessage = isTokenExpired ? "This link has expired. Request a new password reset link to continue." : modalBody;
  // Set focus on OK button when component mounts
  useEffect(() => { 
    if (okRef.current) {
      okRef.current.focus();
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleOkClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOkClick = () => {
    setShowModal(false);
      localStorage.clear()
    navigate("/")
  };

  return (
    <div className="modal fade show session-expired-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered session-expired-dialog">
        <div className="modal-content session-expired-content">
          {/* Header with dark teal background */}
          <div className="modal-header session-expired-header">
            <h5 className="modal-title session-expired-title">
              {displayTitle}
            </h5>
            <button
              type="button"
              className="btn-close session-expired-close-btn"
              onClick={handleOkClick}
            >
              ×
            </button>
          </div>
          
          {/* Body with centered message */}
          <div className="modal-body session-expired-body">
            <div className="session-expired-message">
              {displayMessage}
            </div>
          </div>
          
          {/* Footer with green OK button */}
          <div className=" session-expired-footer">
            <button
              ref={okRef}
              type="button"
              onClick={handleOkClick}
              id="btn-SessionExpired-Login"
              className="btn_style green_btn session-expired-ok-btn"
              onMouseEnter={() => setAddBgColor(true)}
              onMouseLeave={() => setAddBgColor(false)}
            >
              <i className="fa fa-check"></i>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

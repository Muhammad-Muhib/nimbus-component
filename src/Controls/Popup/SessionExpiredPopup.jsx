import React, { useState, useEffect, useRef } from 'react';

export default function SessionExpiredPopup({
  setShowModal,
  onConfirm,
  modalTitle = "Session Expired",
  modalBody = "Your session timed out. Click OK to log in again."
}) {
  const [addBgColor, setAddBgColor] = useState(true);
  const okRef = useRef();

  // Set focus on OK button when component mounts
  useEffect(() => {
    if (okRef.current) {
      okRef.current.focus();
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
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
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="modal fade show confirmationModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
          </div>
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <div className="displayGroupName">{modalBody}</div>
            <br />
          </div>
          <div className="modal-footer" style={{ justifyContent: 'center' }}>
            <button
              ref={okRef}
              type="button"
              className="btn btn-secondary confirmationbtn"
              id="okBtn"
              style={{
                backgroundColor: addBgColor ? "#3f4d54" : "white",
                color: addBgColor ? "white" : "black",
              }}
              onMouseEnter={() => setAddBgColor(true)}
              onClick={handleOkClick}
            >
              <i className="fa fa-check"></i> OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";

export default function ConfirmationPopup({
  setShowModal,
  onClose,
  onConfirm,
  showExtraText,
  additionalText,
  modalBody,
  modalTitle,
}) {
  const [addBgColor, setAddBgColor] = useState(true);
  const okRef = useRef();
  const noRef = useRef();

  // helper: set focus and force-focus-visible class
  const setFocus = (button) => {
    if (!okRef.current || !noRef.current) return;

    // clear both first
    okRef.current.classList.remove("force-focus-visible");
    noRef.current.classList.remove("force-focus-visible");

    // apply to the right one
    if (button === "ok") {
      setAddBgColor(true);
      okRef.current.classList.add("force-focus-visible");
      okRef.current.focus();
    } else if (button === "no") {
      setAddBgColor(false);
      noRef.current.classList.add("force-focus-visible");
      noRef.current.focus();
    }
  };

  // initial focus setup
  useEffect(() => {
    const isDelete = modalBody.toLowerCase().includes("delete");

    const timer = setTimeout(() => {
      if (isDelete) {
        setFocus("no");
      } else {
        setFocus("ok");
      }
    }, 5);

    return () => clearTimeout(timer);
  }, [modalBody]);

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
      if (e.key === "ArrowLeft") {
        setFocus("ok");
      }
      if (e.key === "ArrowRight") {
        setFocus("no");
      }
      if (e.key === "F8" || e.key === "F7") {
        e.preventDefault();
        setFocus("ok");
      }
      if (e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setFocus("no");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modal fade show confirmationModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
          </div>
          <div className="modal-body">
            <div className="displayGroupName">{modalBody}</div>
            {showExtraText && (
              <div className="modalAdditionalText">{additionalText}</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              ref={okRef}
              type="button"
              className="btn btn-secondary confirmationbtn"
              id="okBtn"
              style={{
                backgroundColor: addBgColor ? "#3f4d54" : "white",
                color: addBgColor ? "white" : "black",
              }}
              onMouseEnter={() => setFocus("ok")}
              onClick={() => {
                setShowModal(false);
                onConfirm();
              }}
            >
              Yes
            </button>
            <button
              ref={noRef}
              type="button"
              className="btn btn-secondary confirmationbtn"
              id="noBtn"
              style={{
                backgroundColor: !addBgColor ? "#3f4d54" : "white",
                color: !addBgColor ? "white" : "black",
              }}
              onMouseEnter={() => setFocus("no")}
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                setShowModal(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
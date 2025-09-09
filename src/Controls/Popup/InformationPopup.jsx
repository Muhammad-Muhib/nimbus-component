import React, { useState,useEffect,useRef } from 'react'

export default function InformationPopup({setShowModal,onConfirm,modalBody,modalTitle}) {
    const [addBgColor,setAddBgColor] = useState(true)
    const okRef = useRef();
    useEffect(() => {
      okRef.current.focus()
        const handleKeyDown = (e) => {
          if (e.key == "Escape") {
            setShowModal(false);
          }
        };    
        document.addEventListener("keydown", handleKeyDown);    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
  return (
    <div
            className="modal fade show confirmationModal"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                </div>
                <div className="modal-body">
                  <div className="displayGroupName">{modalBody}</div>              
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary confirmationbtn"
                    id='okBtn'
                    style={{
                        backgroundColor: addBgColor ? '#3f4d54' : "white",
                        color: addBgColor ? "white" : "black"
                    }}
                    onMouseEnter={()=>setAddBgColor(true)}
                    onClick={()=>{
                        setShowModal(false)
                        onConfirm()
                    }}
                    ref={okRef}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}
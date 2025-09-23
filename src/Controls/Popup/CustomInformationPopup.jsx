import React, { useState,useEffect,useRef } from 'react'

export default function CustomInformationPopup({setShowModal,onConfirm,modalBody,modalTitle,headerColor = "",btnColor = ""}) {
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
                <div className="custom-modal-header" style={{backgroundColor:headerColor == "" ? "#3f4d54" : headerColor }}>
                  <h5 className="modal-title">{modalTitle}</h5>
                </div>
                <div className="modal-body">
                  <div className="displayGroupName">{modalBody}</div>              
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary custom-confirmationbtn"
                    style={{backgroundColor:btnColor == "" ? "black" : btnColor,borderColor:btnColor == "" ? "black" : btnColor}}
                    id='okBtn'                    
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
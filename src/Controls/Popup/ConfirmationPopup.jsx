import React, { useState,useEffect } from 'react'

export default function ConfirmationPopup({setShowModal,onClose,onConfirm,showExtraText,additionalText,modalBody,modalTitle}) {
    const [addBgColor,setAddBgColor] = useState(true)
    useEffect(() => {
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
                  {
                    showExtraText && <div className='modalAdditionalText'>{additionalText}</div>
                  }
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary confirmationbtn"
                    style={{
                        backgroundColor: addBgColor ? '#3f4d54' : "white",
                        color: addBgColor ? "white" : "black"
                    }}
                    onMouseEnter={()=>setAddBgColor(true)}
                    onClick={()=>{
                        setShowModal(false)
                        onConfirm()
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary confirmationbtn"   
                    style={{
                        backgroundColor: !addBgColor ? '#3f4d54' : "white",
                        color: !addBgColor ? "white" : "black"
                    }}
                    onMouseEnter={()=>setAddBgColor(false)}
                    onClick={()=>{ if(onClose != null){
                      onClose()
                    } 
                    setShowModal(false)}}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}
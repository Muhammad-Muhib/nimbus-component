import React, { useState,useEffect,useRef } from 'react'

export default function ConfirmationPopup({setShowModal,onClose,onConfirm,showExtraText,additionalText,modalBody,modalTitle}) {
    const [addBgColor,setAddBgColor] = useState(true)
    const okRef = useRef()
    const noRef = useRef()
    useEffect(() => {
      if(modalBody.toLowerCase().includes("delete")){
        noRef.current.focus()        
        setAddBgColor(false)
      }else{
        okRef.current.focus()
        setAddBgColor(true)
      }
    const handleKeyDown = (e) => {
      if (e.key == "Escape") {
        setShowModal(false);
      }
      if (e.key == "ArrowLeft") {
        setAddBgColor(true)
        okRef.current.focus()        
      }
      if (e.key == "ArrowRight") {
        setAddBgColor(false)
        noRef.current.focus()        
      }
      // F8 key - focus on Yes button
      if (e.key == "F8") {
        e.preventDefault();
        setAddBgColor(true)
        okRef.current.focus()        
      }
      // F7 key - focus on Yes button
      if (e.key == "F7") {
        e.preventDefault();
        setAddBgColor(true)
        okRef.current.focus()        
      }
      // Alt+D key - focus on No button
      if (e.altKey && e.key.toLowerCase() == "d") {
        e.preventDefault();
        setAddBgColor(false)
        noRef.current.focus()        
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
                    ref={okRef}
                    type="button"
                    className="btn btn-secondary confirmationbtn"
                    id='okBtn'
                    style={{
                        backgroundColor: addBgColor ? '#3f4d54' : "white",
                        color: addBgColor ? "white" : "black"
                    }}
                    onMouseEnter={()=>{setAddBgColor(true);okRef.current.focus()}}
                    onClick={()=>{
                        setShowModal(false)
                        onConfirm()
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id='noBtn'
                    ref={noRef}
                    className="btn btn-secondary confirmationbtn"   
                    style={{
                        backgroundColor: !addBgColor ? '#3f4d54' : "white",
                        color: !addBgColor ? "white" : "black"
                    }}
                    onMouseEnter={()=>{setAddBgColor(false);noRef.current.focus()}}
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
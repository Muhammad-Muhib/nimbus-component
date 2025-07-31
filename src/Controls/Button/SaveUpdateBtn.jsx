import { FaPrint } from "react-icons/fa";
import {motion} from "framer-motion"
import { useEffect } from "react";
export default function SaveUpdateBtn({showPrint,mode,handlePrint,handleReset,handleSave,loading,handleUpdate,handleDelete,disableSave = false,disableUpdate = false,disableDelete = false,showUnderLine = false}) {
    useEffect(() => {
      const handleKeyDown = (e) => {
        e.stopPropagation();
        if(mode.toLowerCase() == "viewmode"){
          return;
        }
        if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            if(mode.toLowerCase() == "new"){
              handleSave()
              break;
            }else{
              break;              
            }
            case 'u':
              if(mode.toLowerCase() == "update"){
                handleUpdate()
                break;
              }else{
                break;
              }
              case 'd':
                if(mode.toLowerCase() == "update"){
                handleDelete()
                break;
              }else{
                break;
              }
              default: break;
        }
      }else{
        switch (e.key) {
          case 'F7':
            if(mode.toLowerCase() == "update"){
                handleUpdate()
                break;
              }else{
                break;
              }
          case 'F8':
            if(mode.toLowerCase() == "new"){
              handleSave()
              break;
            }else{
              break;              
            }
        }
      }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  return (
    <>
    <div className="btnMainContainer col-md-10 col-sm-10 form-group print_box_bg low_margin">
      {
            (showPrint && mode.toLowerCase() == "update") && <div className="detailPrinterContainer">
        <FaPrint className="detailPrinterIcon" size={26} onClick={handlePrint} />
    </div>
      }
      <div>
        {
          mode.toLowerCase() == "viewmode" ? <button
          type="button"
          className="btn-style btn-disable"
          disabled
        >Cancel</button> : <motion.button
          type="button"
          className="btn-style blue-btn"
          onClick={handleReset}
          whileTap={{
              scale:'0.8'
            }}
        >Cancel</motion.button>
        }
        {mode.toLowerCase() == "update" || mode.toLowerCase() == "viewmode" || disableSave ? (
          <button type="button" className="btn-style btn-disable" disabled>
            {
              showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  S
                </span>
                <span>
                  ave (F8)
                </span>
              </> : Save
            }
          </button>
        ) : (
          <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleSave}
            whileTap={{
              scale:'0.8'
            }}
          >
            {loading ? <span className="loader"></span> : showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  S
                </span>
                <span>
                  ave (F8)
                </span>
              </> : "Save" }
          </motion.button>
        )}
        {mode.toLowerCase() == "new" || mode.toLowerCase() == "viewmode" || disableUpdate ? (
          <>
            <button
              type="button"
              className="btn-style btn-disable"
              disabled
            >
              {
                showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  U
                </span>
                <span>
                  pdate (F7)
                </span>
              </> : Update              
              }
            </button>
          </>
        ) : (
          <>
            <motion.button
              type="button"
              className="btn-style btn-orange"
              onClick={handleUpdate}
              whileTap={{
              scale:'0.8'
            }}
            >
              {loading ? <span className="loader"></span> : showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  U
                </span>
                <span>
                  pdate (F7)
                </span>
              </> : "Update"
              }
            </motion.button>
          </>
        )}
        {mode.toLowerCase() == "new" || mode.toLowerCase() == "viewmode" || disableDelete ? 
        <button
              type="button"
              className="btn-style btn-disable"
              disabled
            >
              {
                showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  D
                </span>
                <span>
                  elete
                </span>
              </> : Delete              
            }
            </button>
        : 
        <motion.button
              type="button"
              className="btn-style btn-red"
              onClick={handleDelete}
              whileTap={{
              scale:'0.8'
            }}
            >
              {
                showUnderLine ? <>
                <span style={{textDecoration:"underline"}}>
                  D
                </span>
                <span>
                  elete
                </span>
              </> : Delete              
              }
            </motion.button>
        }
      </div>
    </div>
    </>
  );
}

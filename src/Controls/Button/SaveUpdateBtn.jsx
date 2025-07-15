import { FaPrint } from "react-icons/fa";
import { useEffect } from "react";
export default function SaveUpdateBtn({showPrint,mode,handlePrint,handleReset,handleSave,loading,handleUpdate,handleDelete,disableSave,disableUpdate,disableDelete}) {
    useEffect(() => {
      const handleKeyDown = (e) => {
        e.stopPropagation();
        if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            if(mode.toLowerCase() != "update"){
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
                handleDelete()
              break;
              default: break;
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
        >Cancel</button> : <button
          type="button"
          className="btn-style blue-btn"
          onClick={handleReset}
        >Cancel</button>
        }
        {mode.toLowerCase() == "update" || mode.toLowerCase() == "viewmode" || disableSave ? (
          <button type="button" className="btn-style btn-disable" disabled>
            Save
          </button>
        ) : (
          <button
            type="button"
            className="btn-style btn-green"
            onClick={handleSave}
          >
            {loading ? <span className="loader"></span> : "Save"}
          </button>
        )}
        {mode.toLowerCase() == "new" || mode.toLowerCase() == "viewmode" || disableUpdate ? (
          <>
            <button
              type="button"
              className="btn-style btn-disable"
              disabled
            >
              Update
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn-style btn-orange"
              onClick={handleUpdate}
            >
              {loading ? <span className="loader"></span> : "Update"}
            </button>
          </>
        )}
        {mode.toLowerCase() == "new" || mode.toLowerCase() == "viewmode" || disableDelete ? 
        <button
              type="button"
              className="btn-style btn-disable"
              disabled
            >
              Delete
            </button>
        : 
        <button
              type="button"
              className="btn-style btn-red"
              onClick={handleDelete}
            >
              Delete
            </button>
        }
      </div>
    </div>
    </>
  );
}

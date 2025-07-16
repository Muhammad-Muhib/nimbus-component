import { useEffect } from "react";
import {motion} from "framer-motion"
export default function SaveCancelBtn({hideCancel,handleReset,handleSave,loading}) {
  useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            handleSave()
            break;
            default:
              break;
        }
      }   
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  return (
    <div className="btnMainContainer saveCancel col-md-10 col-sm-10 form-group print_box_bg low_margin">
      <div>
        {
          hideCancel == true ? <></> : <motion.button
          type="button"
          className="btn-style blue-btn"
          onClick={handleReset}
          whileTap={{
              scale:'0.8'
            }}
        >
          Cancel
        </motion.button>
        }
        <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleSave}
            disabled={loading}
            style={loading ?{cursor:'not-allowed'} : {cursor:'pointer'}}
            whileTap={{
              scale:'0.8'
            }}
          >
            {loading ? <span className="loader"></span> : "Save"}
          </motion.button>
      </div>
    </div>
  );
}

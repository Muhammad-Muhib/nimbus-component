import { useEffect, useState } from "react";
import {motion} from "framer-motion"
export default function SaveCancelBtn({hideCancel,handleReset,handleSave,loading,showUnderLine = false,disableSave=false}) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Override showUnderLine to false on mobile
  showUnderLine = showUnderLine && !isMobile;
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
    <div className="btnMainContainer saveCancel col-md-11 col-sm-11 form-group print_box_bg low_margin">
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
        {
          disableSave ? <>
          <motion.button
            type="button"
            className="btn-style btn-disable"
            disabled
            style={{cursor:'not-allowed'}}            
          >
            {loading ? (
              <span className="loader"></span>
            ) : showUnderLine ? (
              <>
                <span style={{ textDecoration: "underline" }}>S</span>
                <span>ave (F8)</span>
              </>
            ) : (
              "Save"
            )}
          </motion.button>
          </> : <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleSave}
            disabled={loading}
            style={loading ?{cursor:'not-allowed'} : {cursor:'pointer'}}
            whileTap={{
              scale:'0.8'
            }}
          >
            {loading ? (
              <span className="loader"></span>
            ) : showUnderLine ? (
              <>
                <span style={{ textDecoration: "underline" }}>S</span>
                <span>ave (F8)</span>
              </>
            ) : (
              "Save"
            )}
          </motion.button>
        }        
      </div>
    </div>
  );
}

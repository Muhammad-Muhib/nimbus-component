import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from "../Tooltip/InfoIcon";
export default function SaveCancelBtn({
  hideCancel,
  handleReset,
  handleSave,
  loading,
  showUnderLine = false,
  disableSave = false,
  infoText = ""
}) {
  const [isMobile, setIsMobile] = useState(false);
  const saveRef = useRef();
  // Override showUnderLine to false on mobile
  showUnderLine = showUnderLine && !isMobile;
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "F8":
          e.preventDefault();
          e.stopPropagation();
          saveRef.current.click();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "s":
            saveRef.current.click();
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
        {hideCancel == true ? (
          <></>
        ) : (
          <Tooltip title="Clear inputs data" placement="top">
          <motion.button
            type="button"
            className="btn-style blue-btn"
            onClick={handleReset}
            whileTap={{
              scale: "0.8",
            }}
          >
            Cancel
          </motion.button>
          </Tooltip>
        )}
        {disableSave ? (
          <>
          <span>
           <Tooltip title="Save input data" placement="top">
            <motion.button
              type="button"
              className="btn-style btn-disable"
              disabled
              style={{ cursor: "not-allowed" }}
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
            </Tooltip>
            {
            infoText != "" && <InfoIcon body={infoText} />
            }      
          </span>
          </>
        ) : (
          <span>
          <Tooltip title="Save input data" placement="top">
          <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleSave}
            disabled={loading}
            style={loading ? { cursor: "not-allowed" } : { cursor: "pointer" }}
            whileTap={{
              scale: "0.8",
            }}
            ref={saveRef}
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
          </Tooltip>
          {
            infoText != "" && <InfoIcon body={infoText} />
          }          
          </span>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import InfoIcon from "../Tooltip/InfoIcon";
import PrintMenuBtn from "./PrintMenuBtn";
export default function CloseDeleteBtn({
  handleClose,
  handleDelete,
  loading,
  showUnderLine = false,
  disableDelete = false,
  infoText = "",
  closeInfoText = "",
  showPrint = true,
  handlePrintReport,
  printOptions,
  disableClose = false
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
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "d":
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
      {showPrint &&
        <PrintMenuBtn onSelect={handlePrintReport} options={printOptions} />
      }
      <div>
        {
          disableClose ? <span>
          <motion.button
            type="button"
            className="btn-style btn-disable"
            disabled={true}
            whileTap={{
              scale: "0.8",
            }}
          >
            Close
          </motion.button>
          {closeInfoText != "" && <InfoIcon body={closeInfoText} />}
        </span> : <span>
          <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleClose}
            whileTap={{
              scale: "0.8",
            }}
          >
            Close
          </motion.button>
          {closeInfoText != "" && <InfoIcon body={closeInfoText} />}
        </span>
        }        
        {disableDelete ? (
          <span>
            <motion.button
              type="button"
              className="btn-style btn-disable"
              disabled={true}
              style={
                loading ? { cursor: "not-allowed" } : { cursor: "pointer" }
              }
              whileTap={{
                scale: "0.8",
              }}
              ref={saveRef}
            >
              {loading ? (
                <span className="loader"></span>
              ) : showUnderLine ? (
                <>
                  <span style={{ textDecoration: "underline" }}>D</span>
                  <span>elete</span>
                </>
              ) : (
                "Delete"
              )}
            </motion.button>
            {infoText != "" && <InfoIcon body={infoText} />}
          </span>
        ) : (
          <span>
            <motion.button
              type="button"
              className="btn-style btn-red"
              onClick={handleDelete}
              disabled={loading}
              style={
                loading ? { cursor: "not-allowed" } : { cursor: "pointer" }
              }
              whileTap={{
                scale: "0.8",
              }}
              ref={saveRef}
            >
              {loading ? (
                <span className="loader"></span>
              ) : showUnderLine ? (
                <>
                  <span style={{ textDecoration: "underline" }}>D</span>
                  <span>elete</span>
                </>
              ) : (
                "Delete"
              )}
            </motion.button>
            {infoText != "" && <InfoIcon body={infoText} />}
          </span>
        )}
      </div>
    </div>
  );
}

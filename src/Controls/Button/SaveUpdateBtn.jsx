import { FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';

export default function SaveUpdateBtn({
  showPrint,
  mode,
  handlePrint,
  handleReset,
  handleSave,
  loading,
  handleUpdate,
  handleDelete,
  disableSave = false,
  disableUpdate = false,
  disableDelete = false,
  showUnderLine = false,
  hideDelete = false,
  handleCustomButton,
  disableCustomButton = false,
  CustomButtonText = "Custom Button",
  CustomTooltipText = 'Custom Button Tooltip',
  hideCustomButton = true,
}) {
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
      e.stopPropagation();
      if (mode.toLowerCase() == "viewmode") {
        return;
      }
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "s":
            if (mode.toLowerCase() == "new") {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnSave").click()
              break;
            } else {
              break;
            }
          case "u":
            if (mode.toLowerCase() == "update") {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnUpdate").click()
              break;
            } else {
              break;
            }
          case "d":
            if (mode.toLowerCase() == "update") {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnDelete").click()
              break;
            } else {
              break;
            }
          default:
            break;
        }
      } else {
        if (mode.toLowerCase() == "viewmode") {
        return;
      }
        switch (e.key) {
          case "F7":
            if (mode.toLowerCase() == "update") {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnUpdate").click()
              break;
            } else {
              break;
            }
          case "F8":
            if (mode.toLowerCase() == "new") {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnSave").click()
              break;
            } else {
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
      <div className="btnMainContainer col-md-11 col-sm-11 form-group print_box_bg low_margin">
        {showPrint && mode.toLowerCase() != "new" && mode.toLowerCase() != "viewmode" && (
          <div className="detailPrinterContainer">
            <FaPrint
              className="detailPrinterIcon"
              size={26}
              onClick={handlePrint}
            />
          </div>
        )}
        <div>
          {mode.toLowerCase() == "viewmode" ? (
            <Tooltip title="Clear input data" placement="top">
            <button type="button" className="btn-style btn-disable" disabled>
              Cancel
            </button>
            </Tooltip>
          ) : (
            <Tooltip title="Clear input data" placement="top">
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
          {mode.toLowerCase() == "update" ||
          mode.toLowerCase() == "viewmode" ||
          disableSave ? (
            <Tooltip title="Save input data" placement="top">
            <button type="button" className="btn-style btn-disable" disabled>
              {showUnderLine ? (
                <>
                  <span style={{ textDecoration: "underline" }}>S</span>
                  <span>ave (F8)</span>
                </>
              ) : (
                "Save"
              )}
            </button>
            </Tooltip>
          ) : (
            <Tooltip title="Save input data" placement="top">
            <motion.button
              type="button"
              id="btnSave"
              className="btn-style btn-green"
              onClick={handleSave}
              whileTap={{
                scale: "0.8",
              }}
              disabled={loading}
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
          )}
          {mode.toLowerCase() == "new" ||
          mode.toLowerCase() == "viewmode" ||
          disableUpdate ? (
            <>
            <Tooltip title="Update loaded data" placement="top">
              <button type="button" className="btn-style btn-disable" disabled>
                {showUnderLine ? (
                  <>
                    <span style={{ textDecoration: "underline" }}>U</span>
                    <span>pdate (F7)</span>
                  </>
                ) : (
                  "Update"
                )}
              </button>
              </Tooltip>
            </>
          ) : (
            <>
            <Tooltip title="Update loaded data" placement="top">
              <motion.button
                type="button"
                className="btn-style btn-orange"
                onClick={handleUpdate}
                id="btnUpdate"
                whileTap={{
                  scale: "0.8",
                }}
                disabled={loading}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : showUnderLine ? (
                  <>
                    <span style={{ textDecoration: "underline" }}>U</span>
                    <span>pdate (F7)</span>
                  </>
                ) : (
                  "Update"
                )}
              </motion.button>
              </Tooltip>
            </>
          )}
          {!hideDelete && (
            mode.toLowerCase() == "new" ||
            mode.toLowerCase() == "viewmode" ||
            disableDelete ? (
              <Tooltip title="Delete loaded data" placement="top">
                <button type="button" className="btn-style btn-disable" disabled>
                  {showUnderLine ? (
                    <>
                      <span style={{ textDecoration: "underline" }}>D</span>
                      <span>elete</span>
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Delete loaded data" placement="top">
                <motion.button
                  type="button"
                  className="btn-style btn-red"
                  onClick={handleDelete}
                  whileTap={{
                    scale: "0.8",
                  }}
                  id="btnDelete"
                >
                  {showUnderLine ? (
                    <>
                      <span style={{ textDecoration: "underline" }}>D</span>
                      <span>elete</span>
                    </>
                  ) : (
                    "Delete"
                  )}
                </motion.button>
              </Tooltip>
            )
          )}
           {!hideCustomButton && (
            mode.toLowerCase() == "new" ||
            mode.toLowerCase() == "viewmode"
            ? (
              <>
              {
                disableCustomButton ? <Tooltip title={CustomTooltipText} placement="top">
                <button type="button" className="btn-style btn-disable" disabled>
                    {CustomButtonText}
                </button>
              </Tooltip> : <Tooltip title={CustomTooltipText} placement="top">
                <motion.button
                  type="button"
                  className="btn-style btn-red"
                  onClick={handleCustomButton}
                  whileTap={{
                    scale: "0.8",
                  }}
                  id="btnCustom"
                >
                  {CustomButtonText}
                </motion.button>
              </Tooltip>
              }
              </>              
            ) : (
              null
            )
          )}
        </div>
      </div>
    </>
  );
}

import { FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";
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
  showUnderLine = false
}) {
 
  return (
    <>
      <div className="btnMainContainer col-md-12 col-sm-12 form-group print_box_bg low_margin">
        {showPrint && mode.toLowerCase() == "update" && (
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
              className="btn-style btn-green"
              onClick={handleSave}
              whileTap={{
                scale: "0.8",
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
                whileTap={{
                  scale: "0.8",
                }}
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
          {mode.toLowerCase() == "new" ||
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
          )}
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { motion } from "framer-motion";
import CustomTooltip from "../Tooltip/CustomTooltip";
export default function UpdateCancelBtn({
  handleReset,
  handleUpdate,
  disableUpdate = false,
  updateBtnColor = "btn-green",
  showUnderLine = false,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "u":
            if (!disableUpdate) {
              e.preventDefault();
              e.stopPropagation();
              document.querySelector("#btnUpdate").click()
            }
            break;
          default:
            break;
        } } else {
          switch (e.key) {
            case "F7":
              if (!disableUpdate) {
                e.preventDefault();
                e.stopPropagation();
                document.querySelector("#btnUpdate").click()
              }
              break;
          }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableUpdate]);
  return (
    <div className="btnMainContainer saveCancel col-md-10 col-sm-10 form-group print_box_bg low_margin">
      <div>
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
        {disableUpdate ? (
          <>
            <CustomTooltip body="Update loaded data" placement="top">
              <motion.button
              type="button"
              className={`btn-style btn-disable`}
              onClick={handleUpdate}
              whileTap={{
                scale: "0.8",
              }}
            >
              Update
            </motion.button>  
            </CustomTooltip>
          </>
        ) : (
          <>
          <CustomTooltip body="Update loaded data" placement="top">
            <motion.button
              type="button"
              className={`btn-style ${updateBtnColor}`}
              onClick={handleUpdate}
              whileTap={{
                scale: "0.8",
              }}
              id="btnUpdate"
            >
              Update
            </motion.button>
            </CustomTooltip>
          </>
        )}
      </div>
    </div>
  );
}

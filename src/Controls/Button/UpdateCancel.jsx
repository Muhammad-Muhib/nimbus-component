import { useEffect } from "react";
import {motion} from "framer-motion"
export default function UpdateCancelBtn({handleReset,handleUpdate}) {
  useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.altKey) {
        switch (e.key.toLowerCase()) {
            case 'u':
              handleUpdate()
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
        <motion.button
          type="button"
          className="btn-style blue-btn"
          onClick={handleReset}
          whileTap={{
              scale:'0.8'
            }}
        >
          Cancel
        </motion.button>
        <motion.button
            type="button"
            className="btn-style btn-green"
            onClick={handleUpdate}
            whileTap={{
              scale:'0.8'
            }}
          >
            Update
          </motion.button>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import CustomTooltip from "../Tooltip/CustomTooltip";
export default function CustomButton({
  handleCustomButton,
  disableCustomButton = false,
  customBtnColor = "btn-danger",
  buttonText = "Custom Button",
  CustomTooltipText = 'Custom Button Tooltip',
}) {
  return (
    <div className="btnMainContainer col-md-11 col-sm-11 form-group print_box_bg low_margin">
      <div>
        {disableCustomButton ? (
          <>
            <CustomTooltip body={CustomTooltipText} placement="top">
              <motion.button
              type="button"
              className={`btn-style btn-disable`}
              onClick={handleCustomButton}
              whileTap={{
                scale: "0.8",
              }}
            >{buttonText}
            </motion.button>  
            </CustomTooltip>
          </>
        ) : (
          <>
          <CustomTooltip body={CustomTooltipText} placement="top">
            <motion.button
              type="button"
              className={`btn-style ${customBtnColor}`}
              onClick={handleCustomButton}
              whileTap={{
                scale: "0.8",
              }}
              id="btnCustom"
            >{buttonText}
            </motion.button>
            </CustomTooltip>
          </>
        )}
      </div>
    </div>
  );
}

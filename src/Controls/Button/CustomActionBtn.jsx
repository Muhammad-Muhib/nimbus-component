import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import PrintMenuBtn from "./PrintMenuBtn";
import InfoIcon from "../Tooltip/InfoIcon";

export default function CustomActionButton({
  showPrint,
  printOptions = [],
  handlePrintReport = () => {},

  // Button captions
  btn1Caption = "",
  btn2Caption = "",
  btn3Caption = "",
  btn4Caption = "",
  btn5Caption = "",

  // Tooltip texts
  btn1Tooltip = "",
  btn2Tooltip = "",
  btn3Tooltip = "",
  btn4Tooltip = "",
  btn5Tooltip = "",

  // Info icon texts
  btn1Info = "",
  btn2Info = "",
  btn3Info = "",
  btn4Info = "",
  btn5Info = "",

  // Loader states
  btn1Loading = false,
  btn2Loading = false,
  btn3Loading = false,
  btn4Loading = false,
  btn5Loading = false,

  // Custom classes
  btn1Class = "btn-green",
  btn2Class = "blue-btn",
  btn3Class = "btn-orange",
  btn4Class = "btn-red",
  btn5Class = "btn-gray",

  // onClick handlers
  btn1OnClick = () => {},
  btn2OnClick = () => {},
  btn3OnClick = () => {},
  btn4OnClick = () => {},
  btn5OnClick = () => {},
}) {
  // Helper to render button with optional tooltip + info icon
  const renderButton = (caption, tooltip, infoText, loading, customClass, onClick, id) => {
    if (!caption) return null;

    const buttonElement = (
      <motion.button
        key={id}
        type="button"
        id={id}
        className={`btn-style ${customClass}`}
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : caption}
      </motion.button>
    );

    const wrappedButton = tooltip ? (
      <Tooltip key={id} title={tooltip} placement="top">
        {buttonElement}
      </Tooltip>
    ) : (
      buttonElement
    );

    return (
      <div key={id} className="d-inline-flex align-items-center gap-1">
        {wrappedButton}
        {infoText && <InfoIcon text={infoText} />}
      </div>
    );
  };

  return (
    <div className="btnMainContainer col-md-11 col-sm-11 form-group print_box_bg low_margin">
      {showPrint && (
        <PrintMenuBtn onSelect={handlePrintReport} options={printOptions} />
      )}
      <div className="d-flex gap-2 flex-wrap">
        {renderButton(btn1Caption, btn1Tooltip, btn1Info, btn1Loading, btn1Class, btn1OnClick, "btn1")}
        {renderButton(btn2Caption, btn2Tooltip, btn2Info, btn2Loading, btn2Class, btn2OnClick, "btn2")}
        {renderButton(btn3Caption, btn3Tooltip, btn3Info, btn3Loading, btn3Class, btn3OnClick, "btn3")}
        {renderButton(btn4Caption, btn4Tooltip, btn4Info, btn4Loading, btn4Class, btn4OnClick, "btn4")}
        {renderButton(btn5Caption, btn5Tooltip, btn5Info, btn5Loading, btn5Class, btn5OnClick, "btn5")}
      </div>
    </div>
  );
}

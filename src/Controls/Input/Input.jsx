import Tooltip from "../Tooltip/CustomTooltip";
export default function Input({
  customClass,
  label,
  name,
  placeholder,
  customInputClass,
  inputVal,
  setInputVal,
  important,
  disable,
  id,
  maxLength,
  tooltipBody = "",
  tooltipTitle = "",
  placement = "bottom"
}) {
  return (
    <div
      className={`form-group ${
        customClass == null ? "SearchField" : `${customClass}`
      }`}
    >
      <div className="inputContainer">
        <div className="inputLabel">{label}</div>
        {name != null ? (
          <Tooltip body={tooltipBody} title={tooltipTitle} placement={placement}>
          <input
            name={`${name}`}
            onClick={(e) => e.target.select()}
            placeholder={placeholder != null ? `${placeholder}` : ""}
            id=""
            type="text"
            className={`form-control candela_input ${customInputClass}`}
            value={inputVal}
            onChange={(e) => {
              setInputVal(e);
            }}
            style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
            disabled={disable || false}
            maxLength={`${maxLength}`}
          />
          </Tooltip>
        ) : ( 
          <Tooltip body={tooltipBody} title={tooltipTitle} placement={placement}>
          <input
            onClick={(e) => e.target.select()}
            placeholder={placeholder != null ? `${placeholder}` : ""}
            id={`${id}`}
            type="text"
            className={`form-control candela_input ${customInputClass}`}
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
            disabled={disable || false}
            maxLength={`${maxLength}`}
          />
          </Tooltip>                   
        )}
      </div>
    </div>
  );
}

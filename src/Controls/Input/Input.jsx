import { useRef,useEffect } from "react";
import InfoIcon from "../Tooltip/InfoIcon";
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
  id = "",
  maxLength,
  inputRef,
  handleBlur,
  inputTitle = "",
  infoIconBody = ""
}) {
  const internalRef = useRef(null);
  useEffect(() => {
    if (inputRef) {
      inputRef.current = internalRef.current;
    }
  }, [inputRef]);
  return (
    <div
      className={`form-group ${
        customClass == null ? "SearchField" : `${customClass}`
      }`}
    >
      <div className="inputContainer">
        <div className="inputLabel">{label}</div>
        {name != null ? (
          <>
            <input
            ref={internalRef}
              name={`${name}`}
              onClick={(e) => e.target.select()}
              placeholder={placeholder != null ? `${placeholder}` : ""}
              id={id}
              type="text"
              className={`form-control candela_input ${customInputClass}`}
              value={inputVal}
              onChange={(e) => {
                setInputVal(e);
              }}
              style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
              disabled={disable || false}
              maxLength={`${maxLength}`}
              onBlur={handleBlur}
              title={inputTitle}
            />
            {infoIconBody != "" && (<>
            <div className="infoIcon-Input-container">
            <InfoIcon body={infoIconBody}>
            </InfoIcon>
          </div>
          </>
          )}
          </>
        ) : ( 
          <>
          <input
          ref={internalRef}
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
            onBlur={handleBlur}
            title={inputTitle}
          />
          {infoIconBody != "" && (<>
          <div className="infoIcon-Input-container">
          <InfoIcon body={infoIconBody}>
          </InfoIcon>
        </div>
        </>
        )}
        </>
        )}
      </div>
    </div>
  );
}
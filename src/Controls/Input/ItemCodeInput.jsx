import { useRef,useEffect  } from "react";
export default function ItemCodeInput({
  customClass,
  label,
  inputVal,
  setInputVal,
  important,
  id,
  maxLength,
  inputRef,
  handleBlur,
  customInputClass
}) {
  const internalRef = useRef(null);
  useEffect(() => {
    if (inputRef) {
      inputRef.current = internalRef.current;
    }
  }, [inputRef]);
  
  return (
    <div className={`form-group ${
        customClass == null ? "SearchField" : `${customClass}`
      }`}>
      <div className="inputContainer">
        <div className="inputLabel">{label}</div>
        <input
          ref={internalRef}
          onClick={(e) => e.target.select()}
          id={`${id}`}
          type="text"
          className={`form-control item_code_input candela_input ${customInputClass}`}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value)
          }}
          style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
          maxLength={`${maxLength}`}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

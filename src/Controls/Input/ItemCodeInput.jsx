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
  handleBlur
}) {
  const internalRef = useRef(null);
  useEffect(() => {
    if (inputRef) {
      inputRef.current = internalRef.current;
    }
  }, [inputRef]);
  const handleInputChange = (e) => {
    let value = e.target.value;    
    value = value.replace(/[^a-zA-Z\s]/g, "");
    setInputVal(value);
  };
  return (
    <div className={`form-group SearchField ${customClass}`}>
      <div className="inputContainer">
        <div className="inputLabel">{label}</div>
        <input
          ref={internalRef}
          onClick={(e) => e.target.select()}
          id={`${id}`}
          type="text"
          className="form-control item_code_input candela_input"
          value={inputVal}
          onChange={(e) => {
            handleInputChange(e);
          }}
          style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
          maxLength={`${maxLength}`}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

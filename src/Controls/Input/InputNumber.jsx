import { useRef } from "react";
export default function InputNumber({
  customClass,
  label,
  name,
  customInputClass,
  inputVal,
  setInputVal,
  important,
  disable,
  maxLength,
  inputRef,
}) {
  const internalRef = useRef(null);
  useEffect(() => {
    if (inputRef) {
      inputRef.current = internalRef.current;
    }
  }, [inputRef]);
  const handleChange = (e) => {
    let val = e.target.value;
    // Allow only digits and one optional decimal
    if (/^[0-9]*\.?[0-9]*$/.test(val)) {
      setInputVal(val);
    }
  };
  return (
    <div className={`form-group SearchField ${customClass}`}>
      <div className="inputContainer">
        <div className="inputLabel">{label}</div>
        <input
        ref={internalRef}
          name={`${name}`}
          id=""
          type="text"
          onClick={(e) => e.target.select()}
          className={`form-control number_input candela_input ${customInputClass}`}
          value={inputVal}
          onChange={(e) => {
            handleChange(e);
          }}
          style={important == "true" ? { backgroundColor: "#FFFFE8" } : {}}
          disabled={disable || false}
          maxLength={`${maxLength}`}
        />
      </div>
    </div>
  );
}

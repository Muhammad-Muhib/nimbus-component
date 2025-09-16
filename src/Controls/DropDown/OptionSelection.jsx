import { forwardRef,useImperativeHandle,useRef  } from "react";
import Select from "react-select";
import InfoIcon from "../Tooltip/InfoIcon";
const OptionSelection = forwardRef(
  (
    {
      label,
      customClass,
      selectedOption,
      setSelectedOption,
      options,
      placeholder,
      disable,
      customDropDown,
      isClearable = false,
      dropDownRef,
      infoIconBody = ""
    },
    ref
  ) => {
  const classNamePrefix = `DepartmentCompStyle-${label.replace(/\s+/g, "")}`;
  
  const innerRef = useRef(null); // will point to <select> or react-select instance
  const resolvedRef = dropDownRef ?? innerRef;

  // Expose focus/blur no matter what the inner control is
  useImperativeHandle(ref, () => ({
    focus: () => resolvedRef.current?.focus?.(),
    blur: () => resolvedRef.current?.blur?.(),
    get node() {
      return resolvedRef.current;
    },
  }));
  return (
    <div className={`dropdown-wrapper ${classNamePrefix} ${customClass}`}>
      <Select
        classNamePrefix={`${customDropDown} DepartmentCompStyle`}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        isClearable={isClearable}
        menuPortalTarget={document.body}
        isDisabled={disable == null ? false : disable}
        formatOptionLabel={(data, { inputValue }) => (
          <div style={{ fontSize: "14px" }}>{data.label}</div>
        )}
         menuPlacement="auto"
        ref={resolvedRef}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          ...(infoIconBody !== "" && {
            container: (base) => ({ ...base, width: `calc(100% - 30px)` }),
          }),
        }}
        menuPosition="fixed"
      />
      {infoIconBody != "" && (
          <div className="infoIcon-OptionSelection-container">
            <InfoIcon body={infoIconBody} />
          </div>
        )}
      <div className="custom-label">{label}</div>
    </div>
  );
}
)

export default OptionSelection;
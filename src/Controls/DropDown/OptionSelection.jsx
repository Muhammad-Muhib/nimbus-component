import Select from "react-select";

export default function OptionSelection({label,customClass,selectedOption,setSelectedOption,options,placeholder,disable,customDropDown}) {
  const classNamePrefix = `DepartmentCompStyle-${label.replace(
    /\s+/g,
    ""
  )}`;
  return (
    <div
      className={`dropdown-wrapper ${classNamePrefix} ${customClass}`}
    >
      <Select
        classNamePrefix={`${customDropDown} DepartmentCompStyle`}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        isClearable={false}
        menuPortalTarget={document.body}
        isDisabled={disable == null ? false : disable}
        formatOptionLabel={(data, { inputValue }) =>
                  <div style={{fontSize:'14px'}}>
                      {data.label}
                    </div>
                }
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
      <div className="custom-label">{label}</div>
    </div>
  );
}
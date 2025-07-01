import Select from "react-select";

export default function OptionSelectorTopMenu({label,customClass,selectedOption,setSelectedOption,options,placeholder}) {
  const classNamePrefix = `DepartmentCompStyle-${label.replace(
    /\s+/g,
    ""
  )}`;
  return (
    <div
      className={`dropdown-wrapper ${classNamePrefix} ${customClass}`}
    >
      <Select
        classNamePrefix="DepartmentCompStyle"
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        isClearable={false}
        menuPortalTarget={document.body}
        menuPlacement="top" 
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999,fontSize:'13px' }),
        }}
      />
      <div className="custom-label">{label}</div>
    </div>
  );
}

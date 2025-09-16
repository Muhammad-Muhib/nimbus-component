import InfoIcon from "../Tooltip/InfoIcon";
export default function RadioButton({id,label,groupName,value,setSelectedValue,selectedValue,disable=false,infoIconBody=""}) {
  return (
    <div className="custom-radio-wrapper">
      <input
        type="radio"
        id={id}
        name={groupName}
        className="custom-radio"
        checked={selectedValue == value}
        onChange={() => setSelectedValue(value)}
        disabled={disable}
      />
      <label htmlFor={id}>{label}</label>
      {infoIconBody != "" && <InfoIcon body={infoIconBody} />}
    </div>
  );
}

export default function RadioButton({id,label,groupName,value,setSelectedValue,selectedValue}) {
  return (
    <div className="custom-radio-wrapper">
      <input
        type="radio"
        id={id}
        name={groupName}
        className="custom-radio"
        checked={selectedValue == value}
        onChange={() => setSelectedValue(value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

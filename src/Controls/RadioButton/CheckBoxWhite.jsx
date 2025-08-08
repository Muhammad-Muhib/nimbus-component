export default function CheckBoxWhite({item,setItem,name,disableCheckBox,customClass}) {
  return (
    <div className={`custom-checkbox-wrapper ${customClass}`}>
    <input
        type="checkbox"
        className="custom-checkbox custom-checkbox-white"
        checked={item}
        onChange={() => setItem(!item)}
        disabled={disableCheckBox}
    />
    <label className='checkboxText fontStyle' >{name}</label>
</div>
  )
}
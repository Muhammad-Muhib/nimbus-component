export default function CheckBoxWhite({item,setItem,name,disableCheckBox}) {
  return (
    <div className="custom-checkbox-wrapper">
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
export default function CheckBoxWhite({item,setItem,name}) {
  return (
    <div className="custom-checkbox-wrapper">
    <input
        type="checkbox"
        className="custom-checkbox custom-checkbox-white"
        checked={item}
        onChange={() => setItem(!item)}
    />
    <label className='checkboxText fontStyle' >{name}</label>
</div>
  )
}
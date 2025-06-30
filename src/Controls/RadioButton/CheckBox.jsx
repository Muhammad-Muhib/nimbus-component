export default function CheckBox({item,setItem,name}) {
  return (
    <div className="custom-checkbox-wrapper">
    <input
        type="checkbox"
        className="custom-checkbox"
        checked={item}
        onChange={() => setItem(!item)}
    />
    <label className='fontStyle' >{name}</label>
</div>
  )
}
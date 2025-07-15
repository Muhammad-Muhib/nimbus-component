export default function CheckBox({item,setItem,name,customClass,customTextClass}) {
  return (
    <div className={`custom-checkbox-wrapper ${customClass}`}>
    <input
        type="checkbox"
        className="custom-checkbox"
        checked={item}
        onChange={() => setItem(!item)}
    />
    <label className={customTextClass == null ? "fontStyle" : `${customTextClass}`} >{name}</label>
</div>
  )
}
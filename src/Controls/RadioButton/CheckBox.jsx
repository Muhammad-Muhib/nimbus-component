import InfoIcon from "../Tooltip/InfoIcon";

export default function CheckBox({item,setItem,name,customClass,customTextClass,infoIconBody = ""}) {
  return (
    <div className={`custom-checkbox-wrapper ${customClass}`}>
    <input
        type="checkbox"
        className="custom-checkbox"
        checked={item}
        onChange={() => setItem(!item)}
    />
    <label className={customTextClass == null ? "fontStyle" : `${customTextClass}`} >{name}</label>
    {infoIconBody != "" && (<>
      <div className="infoIcon-CheckBox-container">
        <InfoIcon body={infoIconBody}>
        </InfoIcon>
      </div>
    </>)}
</div>
  )
}
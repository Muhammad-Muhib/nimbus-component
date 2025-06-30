export default function ItemCodeInput({customClass,label,inputVal,setInputVal,important,id}) {
  return (
    <div className={`form-group SearchField ${customClass}`}>
        <div className="inputContainer">
                        <div className="inputLabel" >{label}</div>
                        <input onClick={(e)=>e.target.select()} id={`${id}`} type="text" className="form-control item_code_input candela_input" value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} />
                        </div>
                    </div>
  )
}

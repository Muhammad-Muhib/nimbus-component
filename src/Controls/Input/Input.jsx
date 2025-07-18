export default function Input({customClass,label,name,placeholder,customInputClass,inputVal,setInputVal,important,disable,id}) {
  return (
    <div className={`form-group ${customClass == null ? "SearchField" : `${customClass}`}`}>
        <div className="inputContainer">
                        <div className="inputLabel" >{label}</div>
                        {
                          name != null ? <input name={`${name}`} onClick={(e)=>e.target.select()} placeholder={placeholder != null ? `${placeholder}` : ""} id="" type="text" className={`form-control candela_input ${customInputClass}`} value={inputVal} onChange={(e)=>{setInputVal(e)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} disabled={disable || false} /> : 
                          <input onClick={(e)=>e.target.select()} placeholder={placeholder != null ? `${placeholder}` : ""} id={`${id}`} type="text" className={`form-control candela_input ${customInputClass}`} value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} disabled={disable || false} />
                        }
                        </div>
        </div>
  )
}
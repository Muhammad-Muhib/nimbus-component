export default function InputComment({label,placeholder,inputVal,setInputVal,important,customClass,customInputClass}) {
  return (
    <div className={`form-group commentField ${customClass}`}>
        <div className="inputContainer">
                        <div className="inputLabel" >{label}</div>
                        <textarea onClick={(e)=>e.target.select()} placeholder={placeholder != null ? `${placeholder}` : ""} id="" type="text" className={`form-control candela_input comment_input ${customInputClass}`} value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} maxLength="1000" />
                        </div>
                    </div>
  )
}
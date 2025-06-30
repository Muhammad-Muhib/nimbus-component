export default function InputNumber({customClass,label,name,customInputClass,inputVal,setInputVal,important,disable}) {
  return (
    <div className={`form-group SearchField ${customClass}`}>
        <div className="inputContainer">
                        <div className="inputLabel" >{label}</div>
                        {
                          name != null? <input  name={`${name}`} id="" type="text" onClick={(e)=>e.target.select()} className={`form-control number_input candela_input ${customInputClass}`} value={inputVal} onChange={(e)=>{setInputVal(e)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} disabled={disable || false} /> : 
                          <input  id="" type="text" onClick={(e)=>e.target.select()} className={`form-control number_input candela_input ${customInputClass}`} value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}} style={important == "true" ? {backgroundColor:'#FFFFE8'} : {}} disabled={disable || false} />
                        }
        </div>
    </div>
  )
}
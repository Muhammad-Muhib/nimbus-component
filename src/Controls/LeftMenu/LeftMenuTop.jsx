import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleDoubleRight } from "react-icons/fa";
import { ImExit } from "react-icons/im";

export default function LeftMenuTop({handleNavigation}) {
  let screenName = useSelector(state => {
    return state.breadCrumb
  })
  const [breadCrumb,setBreadCrumb] = useState("")
  useEffect(()=>{
    setBreadCrumb(screenName)
  },[screenName])
  return (
    <>
    {
      breadCrumb != "" ? 
      <div>      
      <div className='breadCrumbHead'>{breadCrumb}</div>
        <div className='breadCrumbContainer'>
          <a href="https://nimbus.nimbusrms.com/Home" className='breadCrumbUrlText'>Home</a>
          <FaAngleDoubleRight />
          <span>{breadCrumb}</span>
      </div>
    </div>
      : <></>
    }
    <div className='exitIconContainer' onClick={handleNavigation}>
      <ImExit color='red' />
      <div>
        Go back to Nimbus
      </div>
    </div>
    </>
  )
}
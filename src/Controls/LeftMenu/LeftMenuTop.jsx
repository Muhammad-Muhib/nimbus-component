import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleDoubleRight } from "react-icons/fa";

export default function LeftMenuTop() {
  let screenName = useSelector(state => {
    return state.breadCrumb
  })
  const [breadCrumb,setBreadCrumb] = useState("")
  useEffect(()=>{
    setBreadCrumb(screenName)
  },[screenName])
  return (
    <>
    <div>
      <div className='breadCrumbHead'>{breadCrumb}</div>
        <div className='breadCrumbContainer'>
          <a href="https://nimbus.nimbusrms.com/Home" className='breadCrumbUrlText'>Home</a>
          <FaAngleDoubleRight />
          <span>{breadCrumb}</span>
      </div>
    </div>
    </>
  )
}

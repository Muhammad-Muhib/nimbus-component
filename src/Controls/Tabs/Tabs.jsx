import React,{Fragment} from 'react'

export default function Tabs({tab1name,isRecordTab,tab2name,setMode,setIsRecordTab,mode,setResetState,resetState,handleEditClick}) {
  return (
    <>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className={`nav-link ${isRecordTab ? "tabactive active" : ""}`} data-toggle="tab" href="#tabs-2" role="tab" id="recordsTab" onClick={()=>{setIsRecordTab(true);setMode("")}}  >{tab1name || "Record"}</a> 
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${!isRecordTab ? "tabactive active" : ""}`} data-toggle="tab" href="#tabs-1" role="tab" id="grn" onClick={()=>{setIsRecordTab(false); setMode("new")}} >{tab2name ||"Defintion"}</a>
                </li>
                {
                  !isRecordTab && <li className={`${mode.toLowerCase() == "viewmode" ? "viewModeLabel" : "modeLabel"}`} style={{
              color: mode.toLowerCase() == "new" ? "rgb(39, 174, 96)" : mode.toLowerCase() == "viewmode" || mode.toLowerCase() == "poapproved" ? "red" : "rgb(247, 148, 29)"
            }}>
              {mode.toLowerCase() == "new" ? "Add New Record" : mode.toLowerCase() == "viewmode" ? "View mode only" : mode.toLowerCase() == "poapproved" ? "Approved PO cannot be Updated" : "Edit Existing Record"}
                </li>
                }
                <li className='modeBtnContainer'>
                  <button style={{borderRadius:isRecordTab ? '30px 0px 0px 30px' : '30px 30px 30px 30px'}} className='page_add_btn' onClick={()=>{setMode("new");setResetState(!resetState);setIsRecordTab(false)}}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjc0QzZGQzFGQzYxMUU4QkZCM0RBNTdEQkE4NTJDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjc0QzZGRDFGQzYxMUU4QkZCM0RBNTdEQkE4NTJDNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGNzRDNkZBMUZDNjExRThCRkIzREE1N0RCQTg1MkM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNGNzRDNkZCMUZDNjExRThCRkIzREE1N0RCQTg1MkM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4F9kiAAAAEFJREFUeNpi+P//PwMOPO0/BEzDpYaJgQIwEjUzAkNtJg45GyDWAuJrQHwEl+b/5NrMAsSzyLWZYTSR0FEzQIABAJ1takMfeX+gAAAAAElFTkSuQmCC" width="15" height="15" alt="" />
                   New
                  </button>
                  {
                   isRecordTab && <button className='page_edit_btn' onClick={()=>{handleEditClick()}}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjU3MjRGODFGQzYxMUU4QjVEOUQ3QTQ4QkQxMjcwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjU3MjRGOTFGQzYxMUU4QjVEOUQ3QTQ4QkQxMjcwRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCNTcyNEY2MUZDNjExRThCNUQ5RDdBNDhCRDEyNzBGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCNTcyNEY3MUZDNjExRThCNUQ5RDdBNDhCRDEyNzBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fuWppAAAAOxJREFUeNqMkrsOAVEQhldUolARjUuhIF7EY+j0bo3LNiqF6DWehCXsIlZJK+jUSjn+kdkYG7vOJN/Z7Mn5Zs7OjqGUMjRpgwdwQYH2dMUEOKpP3ChB5J0hPEwQA2MwAyXed/5VNMEaZMAQ5MCJq1/DxL4QdywMQJoT1ILEHotZsGVxwe8jEA9qGIk2H9wIkW5wAHXvrF/s/hCXQmzI81LsAIdFxye6flHKZWCxaOuIUq6AKDfJLzaD/ggtefAEKXAXzdmDVtgc0FLlahOQ5Bus/omePFXfQZ9Q1Jl5mu055vQM6GmBi6EZLwEGAIX4jMitGjNdAAAAAElFTkSuQmCC" width="15" height="15" alt="" />
                   Edit
                  </button>
                  }
                </li>
            </ul>
    </>
  )
}

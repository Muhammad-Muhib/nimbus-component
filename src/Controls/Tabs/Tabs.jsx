import React, { useEffect,useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import RightDrawer from "../RightDrawer/RightDrawer";
import Tooltip from '@mui/material/Tooltip';
import RelatedOperationsMenu from "../RelatedOperation/RelatedOperation";

export default function Tabs({
  tab1name,
  isRecordTab,
  tab2name,
  setMode,
  setIsRecordTab,
  mode,
  setResetState,
  resetState,
  handleEditClick,
  articleModel = [],
  videoModel = [],
  showYouTubeVideo = true,
  showRelatedOperation = true,
  menuItems = [],
  tooltipText = ""
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    // Add/remove body class to prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isDrawerOpen]);
    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };
    
      const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };      
  return (
    <>
      <ul
        className="nav nav-tabs col-md-11 col-sm-11"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={`nav-link ${isRecordTab ? "tabactive active" : ""}`}
            data-toggle="tab"
            href="#tabs-2"
            role="tab"
            id="recordsTab"
            onClick={() => {
              setIsRecordTab(true);
              setMode("");
            }}
          >
            {tab1name || "Record"} 
            {
              tooltipText.trim() != "" && <span style={{marginLeft:'8px'}}>
              <Tooltip
                          placement="top"
                          title={`${tooltipText}`}
                          slotProps={{
                            tooltip: {
                              sx: { fontSize: "11px", fontWeight: "600",backgroundColor:"rgba(0,0,0,0.6)",color:'white' },
                            },
                          }}
                        >
                          <MdInfoOutline size={20} />
                        </Tooltip>
            </span>
            }            
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${!isRecordTab ? "tabactive active" : ""}`}
            data-toggle="tab"
            href="#tabs-1"
            role="tab"
            id="grn"
            onClick={() => {
              setIsRecordTab(false);
              setMode("new");
            }}
          >
            {tab2name || "Defintion"}
          </a>
        </li>
        {!isRecordTab && (
          <li
            className={`${
              mode.toLowerCase() == "viewmode" ? "viewModeLabel" : "modeLabel"
            }`}
            style={{
              color:
                mode.toLowerCase() == "new"
                  ? "rgb(39, 174, 96)"
                  : mode.toLowerCase() == "viewmode" ||
                    mode.toLowerCase() == "poapproved"
                  ? "red"
                  : "rgb(247, 148, 29)",
            }}
          >
            {mode.toLowerCase() == "new"
              ? "Add New Record"
              : mode.toLowerCase() == "viewmode"
              ? "View mode only"
              : mode.toLowerCase() == "poapproved"
              ? "Approved PO cannot be Updated"
              : "Edit Existing Record"}
          </li>
        )}
        <li className="modeBtnContainer">
          <button
            style={{
              borderRadius: isRecordTab
                ? "30px 0px 0px 30px"
                : "30px 30px 30px 30px",
            }}
            className="page_add_btn"
            onClick={() => {
              setMode("new");
              setResetState(!resetState);
              setIsRecordTab(false);
            }}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjc0QzZGQzFGQzYxMUU4QkZCM0RBNTdEQkE4NTJDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjc0QzZGRDFGQzYxMUU4QkZCM0RBNTdEQkE4NTJDNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGNzRDNkZBMUZDNjExRThCRkIzREE1N0RCQTg1MkM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNGNzRDNkZCMUZDNjExRThCRkIzREE1N0RCQTg1MkM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4F9kiAAAAEFJREFUeNpi+P//PwMOPO0/BEzDpYaJgQIwEjUzAkNtJg45GyDWAuJrQHwEl+b/5NrMAsSzyLWZYTSR0FEzQIABAJ1takMfeX+gAAAAAElFTkSuQmCC"
              width="15"
              height="15"
              alt=""
            />
            New
          </button>
          {isRecordTab && (
            <button
              className="page_edit_btn"
              onClick={() => {
                handleEditClick();
              }}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjU3MjRGODFGQzYxMUU4QjVEOUQ3QTQ4QkQxMjcwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjU3MjRGOTFGQzYxMUU4QjVEOUQ3QTQ4QkQxMjcwRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCNTcyNEY2MUZDNjExRThCNUQ5RDdBNDhCRDEyNzBGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCNTcyNEY3MUZDNjExRThCNUQ5RDdBNDhCRDEyNzBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fuWppAAAAOxJREFUeNqMkrsOAVEQhldUolARjUuhIF7EY+j0bo3LNiqF6DWehCXsIlZJK+jUSjn+kdkYG7vOJN/Z7Mn5Zs7OjqGUMjRpgwdwQYH2dMUEOKpP3ChB5J0hPEwQA2MwAyXed/5VNMEaZMAQ5MCJq1/DxL4QdywMQJoT1ILEHotZsGVxwe8jEA9qGIk2H9wIkW5wAHXvrF/s/hCXQmzI81LsAIdFxye6flHKZWCxaOuIUq6AKDfJLzaD/ggtefAEKXAXzdmDVtgc0FLlahOQ5Bus/omePFXfQZ9Q1Jl5mu055vQM6GmBi6EZLwEGAIX4jMitGjNdAAAAAElFTkSuQmCC"
                width="15"
                height="15"
                alt=""
              />
              Edit
            </button>
          )}
          {
            showRelatedOperation && <RelatedOperationsMenu menuItems={menuItems} />
          }
          {
            showYouTubeVideo && 
            <Tooltip title="Videos and Help Documents" placement="top">
            <span className="yotubeIcon" onClick={handleDrawerToggle}>
            <span className="youTubeText">Learn</span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFpSURBVHja7Je/S0JRFIA/L4mvRYdHIeIgjkKDLi22tDg4+g84NDQ4iBBoUxLV0BqEEQ41SbS0JSSBDkIOQmFLS5ORoGCKJeVreUKrP8+QZ7rLvd/HPfeee67FMAwkQyEcCwHLs74+HK8BR8AmsDwjXg8oACng8e8OxIAKEJ4hHHPtsMmKDXcgCBSFMrChgKTgEUgqICgoEFSAQ1DAMfI1XFrVZeuA5/6Cld1tLJpNRkBpNvREFG85hz0SkquEVrcTVyaNJ59FC/jkSrEW8OHJZ3Fl0ljdTrm3wB4J4S3n0BNRucfop9Wm9/A02q2aFrx9fcvbzjGDdme+AoN2h3r8kI+bwljzJxLo3pWpxw/4rjfGXmMsAePzi/e9E1rnVxOnbmSBbrFCY/+U/svr1Doi0bZYAU1BflMBJUGBkjIbxL4AvA+kFFADtsyOdV7RM5m1YSm+BPzAGVCdIbhqMvwmE8vib/jvBX4HAMS5XIFFCzgUAAAAAElFTkSuQmCC"
              alt="youTube"
            />
          </span>
          </Tooltip>
          }          
        </li>
      </ul>
      

      {/* Right Drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        videoModel={videoModel}
        articleModel={articleModel}
        setIsOpen={setIsDrawerOpen}
      ></RightDrawer>
    </>
  );
}

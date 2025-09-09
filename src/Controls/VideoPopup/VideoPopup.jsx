import React from "react";

export default function VideoPopup({handleClose,youTubeLink}) {
  return (
    <>
      <div className="popupOverlay" onClick={handleClose(false)}>
        <div
          className="popupBox"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <div className="popupHeader">
            <span className="popupTitle">Video Title</span>
            <button className="popupClose" onClick={handleClose(false)}>
              ✕
            </button>
          </div>
          <div className="popupBody">
            <iframe
              src={getEmbedUrl(youTubeLink)}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
}

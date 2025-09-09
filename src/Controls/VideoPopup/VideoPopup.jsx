import {useEffect} from "react";

export default function VideoPopup({ handleClose, youTubeLink }) {
    
    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "Escape") {
        handleClose(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [youTubeLink]);

  const getYoutubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const getEmbedUrl = (link) => {
    const id = getYoutubeId(link);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
  };

  return (
    <div className="popupOverlay" onClick={() => handleClose(false)}>
      <div
        className="popupBox"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="popupHeader">
          <span className="popupTitle">Video Title</span>
          <button className="popupClose" onClick={() => handleClose(false)}>
            ✕
          </button>
        </div>
        <div className="popupBody">
          <iframe
            src={getEmbedUrl(youTubeLink)}
            title="YouTube Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

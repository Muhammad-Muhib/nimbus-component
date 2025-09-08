import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import OptionSelection from "../DropDown/OptionSelection";

const RightDrawer = ({
  isOpen,
  onClose,
  videoModel = [],
  articleModel = [],
  setIsOpen,
}) => {
  const [videoSlice, setVideoSlice] = useState([]);
  const languageOptions = [
    { value: "1", label: "English" },
    { value: "2", label: "Urdu" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "1",
    label: "English",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  useEffect(() => {
    if (videoModel.length > 0) {
      setVideoSlice(
        videoModel.filter(
          (item) =>
            item.language.toLowerCase() == selectedLanguage.label.toLowerCase()
        )
      );
    }
  }, [videoModel, selectedLanguage]);
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`right-drawer ${isOpen ? "drawer-open" : "drawer-closed"}`}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <h1 className="drawer-title">Help</h1>
          {
            isOpen &&  <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <IoClose size={24} />
          </button>
          }          
        </div>

        {/* Drawer Content */}
        <div className="drawer-content">
          {videoModel.length > 0 && (
            <div className="videosContainer">
              <h2 className="videoHeader">Videos</h2>
              <div className="videoLanguageDropDownContainer">
                <OptionSelection
                  label={"Select language for video"}
                  options={languageOptions}
                  selectedOption={selectedLanguage}
                  setSelectedOption={setSelectedLanguage}
                />
              </div>
              <div className="videoCardContainer">
                {videoSlice.map((item, index) => {
                  return (
                    <a
                      href={`${item.youTubeLink}`}
                      className="videoCard"
                      key={index}
                    >
                      <img src={`${item.youTubePic}`} className="youTubeImg" />
                      <div className="youtubeText">{item.description}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {articleModel.length > 0 && (
            <div className="articleContainer">
              <h2 className="videoHeader">Articles</h2>
              <div className="artcleCardContainer">
                {articleModel.map((item, index) => {
                  return (
                    <div key={index}>
                      <a href={`${item.articleLink}`} className="articleText"  target="_blank">
                        {item.articleText}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RightDrawer;

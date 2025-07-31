import { FaSearch } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import LeftMenuList from "./LeftMenuList";
import { MdLaptop } from "react-icons/md";
import LeftMenuTop from "./LeftMenuTop";
import { motion, AnimatePresence } from "framer-motion";

export default function LeftMenu({
  isOpen = true,
  setIsOpen
}) {
  const updateDate = "Apr 30, 2025" 
  const currentVersion = "4.3.4.5"
  // Animation variants for better control
  const containerVariants = {
    open: {
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuVariants = {
    open: {
      position: 'fixed',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      position: "relative",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delay: 0.1
      }
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const handleNavigation = ()=>{
    window.location.replace("https://nimbus.nimbusrms.com/Home")
  }

  return (
    <motion.div 
      className="leftMenumainContainer"
      variants={containerVariants}
      animate={isOpen ? "open" : "closed"}
      initial={false}
    >
      <motion.div 
        className="leftmenucontainer"
        variants={menuVariants}
        animate={isOpen ? "open" : "closed"}
        initial={false}
      >
        <div className="scoop-left-header">
          <motion.div className="scoop-logo" onClick={handleNavigation} >
            <img
              src="data:image/png;base64,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"
              alt=""
              id="nimbusLogo"
            />
            {/* <FaSearch id="searchIcon" />
            <input
              type="text"
              className="form-control btnClickTrackCls"
              placeholder="Search (^+K)"
              id="searchInput"
            />
            <i className="fa fa-times" id="closeSearch"></i>
            <div
              className="sidebar_toggle"
              title="Collapse sidebar"
              id="DashboardMainMenuID"
            >
              <a
                className="leftbarcollapestyle"
                id="collapselink"
                onClick={() => setIsOpen(!isOpen)}
              >
                <LuMenu className="icon-menu" />
              </a>
            </div> */}
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          {false && (
            <motion.div
              variants={contentVariants}
              initial={false}
              animate="open"
              exit="closed"
              style={{ overflow: 'hidden' }}
              className="leftMenuListContiner"
            >
              <LeftMenuList showLeftMenu={isOpen} />
              <div className="nimbusInfoContainer">
                <div className="currentVersion">
                  <MdLaptop className="laptopIcon" /> Version: {currentVersion}
                </div>
                <div className="updatedDate">Updated on: {updateDate}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="topmenucontainer">
        <LeftMenuTop handleNavigation={handleNavigation} />
      </div>
    </motion.div>
  );
}
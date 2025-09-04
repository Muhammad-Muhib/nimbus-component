
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
  const handleLogOut = ()=>{
    window.location.href = "/";
  }

  return (
    <motion.div 
      className="leftMenumainContainer col-md-12 col-sm-12"
      variants={containerVariants}
      animate={isOpen ? "open" : "closed"}
      initial={isOpen}
    >
      <motion.div 
        className="leftmenucontainer"
        variants={menuVariants}
        animate={isOpen ? "open" : "closed"}
        initial={isOpen}
      >
        
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={contentVariants}
              initial={isOpen}
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
        <LeftMenuTop handleNavigation={handleNavigation} handleLogOut={handleLogOut} />
      </div>
    </motion.div>
  );
}
import { FaRecycle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import {motion} from "framer-motion"
import CustomTooltip from "../Tooltip/CustomTooltip";

export default function SearchResetBtn({handleSearch,loading,handleSearchReset,resetLoad,showResetBtn=true}) {
  return (
    <>
    <CustomTooltip body={"Search"}>
      <motion.button
          type="button"
          className="btn-orange btn-search"
          onClick={handleSearch}
          whileTap={{
              scale:'0.8'
            }}
        >
      {loading ? <span className="loader"></span> : <span><FiRefreshCw /> Search</span> }    
        </motion.button>
    </CustomTooltip>    
        {
          showResetBtn && 
          <CustomTooltip body={"Search Reset"}>
          <motion.button
          type="button"
          className="btn-search btn-green btn-reset"
          onClick={handleSearchReset}
          whileTap={{
              scale:'0.8'
            }}
        >
          {resetLoad ? <span className="loader"></span> : <span><FaRecycle /> Reset</span> }    
        </motion.button>
        </CustomTooltip>
        }
    </>
  )
}
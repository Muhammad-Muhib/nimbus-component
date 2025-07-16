import { FaRecycle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import {motion} from "framer-motion"

export default function SearchResetBtn({handleSearch,loading,handleSearchReset,resetLoad}) {
  return (
    <>
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
    </>
  )
}
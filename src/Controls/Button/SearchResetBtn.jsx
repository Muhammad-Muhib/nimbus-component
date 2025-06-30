import { FaRecycle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

export default function SearchResetBtn({handleSearch,loading,handleSearchReset,resetLoad}) {
  return (
    <>
    <button
          type="button"
          className="btn-orange btn-search"
          onClick={handleSearch}
        >
      {loading ? <span className="loader"></span> : <span><FiRefreshCw /> Search</span> }    
        </button>
        <button
          type="button"
          className="btn-search btn-green btn-reset"
          onClick={handleSearchReset}
        >
          {resetLoad ? <span className="loader"></span> : <span><FaRecycle /> Reset</span> }    
        </button>
    </>
  )
}
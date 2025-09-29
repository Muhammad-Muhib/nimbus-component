import { useState, useEffect, useRef } from "react";
import { getTableData } from "../../IndexDbServices/indexDbServices";
import Input from "../Input/Input";
import PopupPaginationComp from "../Pagination/PopupPagination";

export default function CustomerHelpPopup(props) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [internalShowModal, setInternalShowModal] = useState(false);
  const showModal = props.showModal !== undefined ? props.showModal : internalShowModal;
  const setShowModal = props.setShowModal || setInternalShowModal;

  const rowsPerPage = 10;
   
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const customerCodeRef = useRef(null);
  
  useEffect(() => {
    fetchAllProducts();
    fetchAllShops();
  }, [])

  // Focus on customer code input when modal opens
  useEffect(() => {
    if (showModal && customerCodeRef.current) {
      console.log("Focusing on customer code input");
      customerCodeRef.current.focus();
      customerCodeRef.current.select();
    }
  }, [showModal]);
   
  // Get data from IndexedDB
  const fetchAllProducts = async () => {
    try {
      const data = await getTableData("memberInfo")
      let filteredData = data;
      if (props.showCredit === true) {
        filteredData = data.filter(member => 
          member.allowCredit === true 
        );
      }
      setAllCustomers(filteredData || [])
    } catch (error) {
      console.error("Error fetching MemberInfo:", error)
      setAllCustomers([])
    }
  }

  // Get shop data from IndexedDB
  const fetchAllShops = async () => {
    try {
      const data = await getTableData("shop")
      setAllShops(data || [])
    } catch (error) {
      console.error("Error fetching Shop:", error)
      setAllShops([])
    }
  }

  // Generate receipt number in format: ShopMembershipCode-MemberNo-CardDuplicateNo
  const generateReceiptNumber = (customer) => {
    if (!customer || !allShops || allShops.length === 0) return '';
    
    const shop = allShops.find(s => s.shopId === customer.shopId);
    if (!shop || !shop.shopMembershipCode) return '';
    
    const shopCode = shop.shopMembershipCode.toString().padStart(3, '0');
    const memberNo = (customer.memberNo || 0).toString().padStart(6, '0');
    const cardDuplicateNo = (customer.cardDuplicateNo || 0).toString().padStart(2, '0');
    
    const receiptNumber = `${shopCode}-${memberNo}-${cardDuplicateNo}`;
    
    return receiptNumber;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  useEffect(() => {
    filterCustomers();
  }, [allCustomers, customerName, customerCode]);

  const filterCustomers = () => {
    if (!allCustomers || allCustomers.length === 0) {
      setFilteredCustomers([]);
      return;
    }

    let filtered = [...allCustomers];

    // Filter by customer code (receipt number)
    if (customerCode && customerCode.trim() !== "") {
      filtered = filtered.filter(customer => {
        const receiptNumber = generateReceiptNumber(customer);
        return receiptNumber.toLowerCase().includes(customerCode.toLowerCase());
      });
    }

    // Filter by customer name
    if (customerName && customerName.trim() !== "") {
      filtered = filtered.filter(customer => 
        customer.memberName && customer.memberName.toLowerCase().includes(customerName.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle customer selection from popup
  const handleCustomerSelection = (customer) => {
    const receiptNumber = generateReceiptNumber(customer);
    props.handleSelection({
        ...customer,
        receiptNumber: receiptNumber,
        memberCode: receiptNumber, 
        memberName: customer.memberName
    });
    setShowModal(false);
    
  };

  const handleRowSelect = (customer) => {
    setSelectedRow(customer.memberId);
    handleCustomerSelection(customer);
  };

  const handleSearch = () => {
    // Search is handled automatically by the filterCustomers useEffect
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setCustomerName("");
    setCustomerCode("");
    setCurrentPage(1);
  };

  const renderTableRows = () => {
    if (filteredCustomers.length === 0) {
      return (
        <tr>
          <td colSpan="2" className="customerHelpNoData">
            No customers found
          </td>
        </tr>
      );
    }

    // Get current page data
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = filteredCustomers.slice(startIndex, endIndex);

    return currentPageData.map((customer, index) => (
      <tr 
        key={index} 
        onClick={() => handleRowSelect(customer)}
        className={`customerHelpRow ${selectedRow === customer.memberId ? 'selected' : ''}`}
      >
        <td className="customerHelpPopupText">
          {generateReceiptNumber(customer)}
        </td>
        <td className="customerHelpPopupText">
          {customer.memberName || ''}
        </td>
      </tr>
    ));
  };

  return (
    <div className="customerHelpPopup">
      {/* Popup Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Help</h5>
                <div className="closeBtnContainer">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-close modalCloseBtn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="modal-body">
                  <div className="modalSearchContainer">
                    <div className="row d-flex">
                    <Input
                      label="Customer Code"
                      inputVal={customerCode}
                      setInputVal={setCustomerCode}
                      customClass="customerHelpInput col-lg-6 col-md-6 col-sm-12 mb-2"
                      inputRef={customerCodeRef}
                    />
                  <Input
                    label="Customer Name"
                    inputVal={customerName}
                    setInputVal={setCustomerName}
                    customClass="customerHelpInput  col-sm-12 col-lg-6 col-md-6"
                  />
                    </div>
                   
                  <button
                    onClick={handleSearch}
                    className="btn btn-success customerSearchBtn"
                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                  >
                    SEARCH
                  </button>
                </div>
                
                <div className="customerHelpTable">
                  <table className="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th className="customerHelpPopupHeader">Customer Code</th>
                        <th className="customerHelpPopupHeader">Customer Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows()}
                    </tbody>
                  </table>
                </div>

                {filteredCustomers.length > rowsPerPage && (
                  <div className="customerHelpPagination">
                    <PopupPaginationComp
                      rowsPerPage={rowsPerPage}
                      detailObjLength={filteredCustomers.length}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
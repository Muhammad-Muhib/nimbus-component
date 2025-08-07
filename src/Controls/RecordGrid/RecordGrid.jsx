import { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { parse, isValid, format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import MailPopup from "../Popup/MailPopup";
import apiService from "../../ApiService/apiService";

export default function RecordGrid({
  tablebody,
  id,
  currentPage,
  setSelectedRecord,
  gridModel,
  csvName,
  rowsPerPage,
  handledblclick,
  printHeading,
  header,
  showFotter = false,
  totalQtyFoot,
  totalAmountFoot,
  disablePrint = false,
  disableCSV = false,
}) {
  const [selectedId, setSelectedId] = useState();
  const [tableData, setTableData] = useState(tablebody);
  const [showMailModal,setShowMailModal] = useState(false);
  const [toMail,setToMail] = useState("")
    const [subject,setSubject] = useState("")
    const [body,setBody] = useState("")
  const tableRef = useRef(null);
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

  let formattedDate = "";
  useEffect(() => {
    setTableData(tablebody);
    setSubject(printHeading)
  }, [tablebody]);

  useEffect(()=>{
    setSelectedId(null)
  },[currentPage])

  const handleRowSelect = (item) => {
    setSelectedId(item[id]);
    setSelectedRecord(item);
  };
  const handleDownloadCSV = () => {
    if (!tableData || tableData.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Step 1: Build headers
    const headers = gridModel.map((col) => col.csvHeader);

    // Step 2: Build rows
    const rows = tableData.map((item) => {
      return gridModel.map((col) => {
        const key = col.name.replace(/\s/g, "");
        let value = item[key];

        // Format date
        if (col.columnType.toLowerCase() === "date") {
          value = /^\d{1,2}\/[A-Za-z]{3}\/\d{4}$/.test(value)
            ? value
            : parseDate(value);
        }

        return `"${value}"`;
      });
    });

    // Step 3: Combine header + rows into CSV string
    const csvContent =
      headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    // Step 4: Trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${csvName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const sendEmail=async ()=>{
    if (!tableRef.current) {
      toast.error("Table not found");
      return;
    }

    if (!tableData || tableData.length === 0) {
      toast.error("No data to convert");
      return;
    }

    if(toMail == null || toMail == ""){
      toast.error("Please enter an Email ID.")
      return;
    }else{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(toMail)){
        toast.error("Please enter a Valid Email ID.")
        return;
       }
    }
    if(subject == null || subject == ""){
      toast.error("Please enter subject.")
      return
    }

    try {    
      // Configure html2canvas options for better quality
      const canvas = await html2canvas(tableRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",        
        scrollX: 0,
        scrollY: 0        
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
        const formData = new FormData();
        formData.append('Attachment', blob, `${printHeading}.png`);
        formData.append("EmailBody",body)
        formData.append("EmailTo",toMail)
        formData.append("EmailSubject",subject)

        apiService({
          endpoint:apiUrl+"/Email/Send",
          method:"POST",
          data:formData,
          contentType:"multipart/form-data"
        }).then((res)=>{
          if(res.data.success){
            setShowMailModal(false)
            toast.success("Mail sent successfully")
          }else{
            setShowMailModal(false)
            toast(res.error)
          }
        }).catch((ex)=>{
          setShowMailModal(false)
          console.log(ex)
          toast.error("Something went wrong")
        })
          
        } else {
          setShowMailModal(false)
          toast.error("Failed to create image");
        }
      }, "image/png", 0.95);

    } catch (error) {
      console.error("Error converting table to image:", error);
      toast.error("Failed to convert table to image");
    }
  }

  const convertTableToImage = async () => {
    const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
    setBody(`${printHeading} as on ${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`)
    setShowMailModal(true)    
  };

  const renderTableRows = () => {
    const currentRows = tableData.slice(0, 0 + rowsPerPage);
    {
      return currentRows.map((item, index) => {
        return (
          <tr
            className="tableRow"
            onDoubleClick={() => handledblclick(item)}
            onClick={() => handleRowSelect(item)}
            key={index}
          >
            {gridModel.map((obj) => {
              const key = obj.name.replace(/\s/g, "");

              if (obj.columnType.toLowerCase() == "date") {
                formattedDate = /^\d{1,2}\/[A-Za-z]{3}\/\d{4}$/.test(item[key])
                  ? item[key]
                  : parseDate(item[key]);
                item[key] = formattedDate;
              }
              return (
                <>
                  <td
                    key={index}
                    style={{
                      textAlign:
                        obj.columnType.toLowerCase() == "string"
                          ? `left`
                          : `right`,
                      backgroundColor: selectedId == item[id] ? "#4FABFF" : "",
                      color: selectedId == item[id] ? "white" : "black",
                    }}
                  >
                    {
                      obj.columnType.toLowerCase() == "numeric" ? parseFloat(item[key]).toFixed(2)  : item[key]
                    }
                  </td>
                </>
              );
            })}
          </tr>
        );
      });
    }
  };
  return (
    <>
      <div className="recordGridContainter" id="printable-area">
        <h3 className="printHeading">{printHeading || ""}</h3>
        <div className="tableHeaderContainer">
          <span className="tablePrintHead ">{printHeading}</span>
          <span className="printBtnContainer">
            <motion.button
              whileTap={{
                scale: "0.8",
              }}
              onClick={handleDownloadPDF}
              className={`gridPrintBtn ${disablePrint ? "disableBtn" : ""}`}
              disabled={disablePrint}
            >
              Print
            </motion.button>
            <motion.button
              whileTap={{
                scale: "0.8",
              }}
              onClick={handleDownloadCSV}
              className={`gridPrintBtn ${disableCSV ? "disableBtn" : ""}`}
              disabled={disableCSV}
            >
              CSV
            </motion.button>
            <motion.button
              whileTap={{
                scale: "0.8",
              }}
              onClick={convertTableToImage}
              className="gridPrintBtn"
            >
              Email
            </motion.button>
            
          </span>
        </div>
        <Table ref={tableRef} bordered responsive striped className="gridContainer">
          <thead>
            <tr>
              {header.map((item, index) => {
                return (
                  <th
                    key={index}
                    style={
                      item.columnType.toLowerCase() == "string"
                        ? { textAlign: `left` }
                        : { textAlign: `right` }
                    }
                    className="gridTableHeader"
                  >
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData == null || tableData.length == 0 ? (
              <tr>
                <td colSpan={header.length} className="noData">
                  No data available!
                </td>
              </tr>
            ) : (
              <>{renderTableRows()}</>
            )}
          </tbody>
          {showFotter && tableData.length > 0 && (
            <tfoot
            className="total-section"
              style={{ width: "100%", backgroundColor: "pink", height: "3rem" }}
            >
              <tr>
                {header.map((item, index) => {
                  if (index == 0) {
                    return <td className="footColor recordtotal">Total:</td>;
                  } else if (item.name.toLowerCase().includes("qty")) {
                    return (
                      <td className="footColor recordAlignRight footText">
                        {parseFloat(totalQtyFoot).toFixed(2)}
                      </td>
                    );
                  } else if (
                    item.name.toLowerCase().includes("amount") ||
                    item.name.toLowerCase().includes("value")
                  ) {
                    return (
                      <td className="footColor recordAlignRight footText">
                        {parseFloat(totalAmountFoot).toFixed(2)}
                      </td>
                    );
                  } else {
                    return <td className="footColor"></td>;
                  }
                })}
              </tr>
            </tfoot>
          )}
        </Table>
      </div>
      {
        showMailModal && <MailPopup showMailModal={showMailModal} setShowMailModal={setShowMailModal} body={body} setBody={setBody} subject={subject} setSubject={setSubject} toMail={toMail} setToMail={setToMail} sendEmail={sendEmail} />
      }
    </>
  );
}

const parseDate = (input) => {
  if (!input) return "";
  let date;
  // If input is already a Date
  if (input instanceof Date) {
    date = input;
  } else if (typeof input === "string") {
    // Try to parse as ISO first
    date = parseISO(input);
    // If not valid ISO, try custom format
    if (!isValid(date)) {
      date = parse(input, "MM/dd/yyyy h:mm:ss a", new Date());
    }
  }
  // Final validation
  if (!isValid(date)) return "";
  return format(date, "dd/MMM/yyyy");
};
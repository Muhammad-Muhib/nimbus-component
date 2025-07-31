import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { parse, isValid, format, parseISO } from "date-fns";
import { motion } from "framer-motion";

export default function RecordGrid({
  tablebody,
  id,
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

  let formattedDate = "";
  useEffect(() => {
    setTableData(tablebody);
  }, [tablebody]);

  const handleRowSelect = (item) => {
    setSelectedId(item[id]);
    setSelectedRecord(item);
  };
  const handleDownloadCSV = () => {
    if (!tableData || tableData.length === 0) {
      alert("No data to export");
      return;
    }

    // Step 1: Build headers
    const headers = gridModel.map((col) => col.name);

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
              onClick={handleDownloadPDF}
              className="gridPrintBtn"
            >
              Email
            </motion.button>
          </span>
        </div>
        <Table bordered responsive striped className="gridContainer">
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
              style={{ width: "100%", backgroundColor: "pink", height: "3rem" }}
            >
              <tr>
                {header.map((item, index) => {
                  if (index == 0) {
                    return <td className="footColor recordtotal">Total:</td>;
                  } else if (item.name.toLowerCase().includes("qty")) {
                    return (
                      <td className="footColor recordAlignRight footText">
                        {totalQtyFoot}
                      </td>
                    );
                  } else if (
                    item.name.toLowerCase().includes("amount") ||
                    item.name.toLowerCase().includes("value")
                  ) {
                    return (
                      <td className="footColor recordAlignRight footText">
                        {totalAmountFoot}
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

import React, { useRef } from "react";
import { toast } from "react-toastify";
import { MdInfoOutline } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

const FileLoader = ({ LoadProductsThroughLoaderFile,format }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    const isText = file.type.match(/text.*/);
    const isCsv = file.type === "application/vnd.ms-excel";

    if ((isText || isCsv) && (ext === "csv" || ext === "txt")) {
      // Clear the input so the same file can be re-selected later
      fileInputRef.current.value = null;
      handleUpload(file); // Pass the file to parent handler
    } else {
      alert("Please select a valid CSV or TXT file.");
      fileInputRef.current.value = null;
    }
  };

  //File Loader Section
  const handleUpload = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const rows = e.target.result.split(/\r?\n/);
      let listOfObjects = [];

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(",");
        if (cells.length > 1) {
          const singleObj = {
            productCode: cells[0].toUpperCase().trim(),
            qty: parseFloat(cells[1].trim()) || 0,
          };
          listOfObjects.push(singleObj);
        }
      }

      // Merge qty by Code if there is more than one tuple with same product Code
      listOfObjects = Object.values(
        listOfObjects.reduce((acc, curr) => {
          if (acc[curr.productCode]) {
            acc[curr.productCode].qty += curr.qty;
          } else {
            acc[curr.productCode] = { ...curr };
          }
          return acc;
        }, {})
      );

      if (listOfObjects.length === 0) {
        toast.error("No product exists to be loaded");
        return;
      }

      if (listOfObjects.length <= 1000) {
        LoadProductsThroughLoaderFile(listOfObjects, 0);
      } else {
        toast.error(
          "You can't load more than 1000 items at a time via text/csv file"
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="fileLoaderComponent">
      <label htmlFor="grnFile" className="fileLoaderLabel">
        Load File:
      </label>
      <input
        type="file"
        id="grnFile"
        ref={fileInputRef}
        accept=".csv,.txt"
        onChange={handleFileChange}
        className="fileLoaderInput"
      />
      <Tooltip
        title={
          <>
            You can load the text file and it should be in following format:
            <br />
            <b>{format}</b>
            <br />
            <b> Note: Each Item must be in separate line. </b>              
          </>
        }
        placement="top"
      >
        <MdInfoOutline />
      </Tooltip>
    </div>
  );
};

export default FileLoader;

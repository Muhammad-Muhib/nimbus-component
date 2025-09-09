import React, { useState,useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCogs, FaHandHoldingUsd, FaSpinner } from "react-icons/fa";
import ShowHideContainer from "../Slider/ShowHideContainer";
import "../../../styles/Popup/PaidFeatureWarning.css";
import { apiService } from "nimbus-kit";
import { toast } from "react-toastify";
import { parse, isValid, format } from "date-fns";
import { thousandformater } from "../../Utilities/thousandFormater";

export default function PaidFeatureWarning({
  show,
  onProceed,
  onCancel,
  newExpiryDate = "",
  dateColor = "red"
}) {
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const proceedRef = useRef(null);
  const cancelRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [afterTrans, setAfterTrans] = useState({});
  const [beforeTrans, setBeforeTrans] = useState({});
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCostDetails = async () => {
    if (!showDetails) {
      setIsLoading(true);
      let Obj = {
        transactionHead: "Register",
        isExtending: true,
      };

      try {
        const res = await apiService({
          endpoint: apiUrl + "/Common/GetCostDetail",
          method: "POST",
          data: Obj,
        });

        if (res.data.success) {
          setAfterTrans(res.data.data.afterTransaction[0]);
          setBeforeTrans(res.data.data.beforeTransaction[0]);
          setRemainingBalance(res.data.data.remainingBalance);
          setCurrency(res.data.data.currencyRate);
          setShowDetails(!showDetails);
        } else {
          toast.error(res.error);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowDetails(!showDetails);
    }
  };

  if (!show) return null;
  useEffect(()=>{
    proceedRef.current?.focus()
    proceedRef.current.style.border = "2px solid black";
  },[])

  useEffect(() => {
    if (show) {
      proceedRef.current?.focus();
    }
  }, [show]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        proceedRef.current.style.border = "none";
        cancelRef.current?.focus();
      } else if (e.key === "ArrowLeft") {
        proceedRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  return createPortal(
    <div className="pfw-overlay">
      <div className="pfw-modal">
        <div className="pfw-header">
          <div className="pfw-icon">
            <FaCogs className="pfw-gear" />
            <FaHandHoldingUsd className="pfw-hand" />
          </div>
          <div className="pfw-title">
            <span className="pfw-warning">
              Warning!{" "}
              <span className="pfw-text">
                This is a paid feature. This will cost you.
              </span>
              <span className="pfw-subtext">
                Your Nimbus subscription expiry date will be changed to:
                <span className={`pfw-date ${dateColor == "green" ? "pfw-date-green" :"pfw-date-red" }`}> {newExpiryDate}</span>
              </span>
            </span>
          </div>
        </div>

        <button
          className={`pfw-toggle ${isLoading ? "pfw-loading" : ""}`}
          onClick={getCostDetails}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="pfw-spinner" />
              Loading...
            </>
          ) : showDetails ? (
            <>
              <IoIosArrowUp />
              Show/Hide Details
            </>
          ) : (
            <>
              <IoIosArrowDown />
              Show/Hide Details
            </>
          )}
        </button>

        <ShowHideContainer show={showDetails}>
          <div className="pfw-details">
            <div className="pfw-balance">
              Remaining Balance:{" "}
              <span>{thousandformater(formatCurrency(remainingBalance))}</span>
            </div>

            <div className="pfw-panels">
              {/* Current */}
              <div className="pfw-panel pfw-current">
                <div className="pfw-panel-header">
                  <strong>
                    <span>Current Expiry Date</span>
                  </strong>
                  <strong>{parseDate(beforeTrans.enddate)}</strong>
                </div>
                <ul>
                  <li>
                    <span>Retail Module Cost (daily)</span>
                    <b>
                      {thousandformater(formatCurrency(beforeTrans.licenseCost / 30))}
                    </b>
                  </li>
                  {beforeTrans.accountModuleActive && (
                    <li>
                      <span>Accounting Module Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(beforeTrans.accountingModuleCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {beforeTrans.fbrIntegration && (
                    <li>
                      <span>FBR Integration Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(beforeTrans.fbrIntegrationCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {beforeTrans.digitalInvoice && (
                    <li>
                      <span>Digital Invoice Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(beforeTrans.digitalInvoiceCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {beforeTrans.noOfCurrrentKitchenDisplays > 0 && (
                    <li>
                      <span>Kitchen Display Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(
                            beforeTrans.kitchenDisplayCost /
                              (30 / beforeTrans.noOfCurrrentKitchenDisplays)
                          )
                        )}
                      </b>
                    </li>
                  )}
                  <li>
                    <strong>
                      <span>Current License Cost (daily):</span>
                    </strong>
                    <b>
                      {thousandformater(formatCurrency(beforeTrans.totalCost / 30))}
                    </b>
                  </li>
                  <li>
                    <strong>
                      <span>Current License Cost (Monthly):</span>
                    </strong>
                    <b>{thousandformater(formatCurrency(beforeTrans.totalCost))}</b>
                  </li>
                </ul>
              </div>

              {/* New */}
              <div className="pfw-panel pfw-new">
                <div className="pfw-panel-header">
                  <strong>
                    <span>New Expiry Date</span>
                  </strong>
                  <strong>{newExpiryDate}</strong>
                </div>
                <ul>
                  <li>
                    <span>Retail Module Cost (daily)</span>
                    <b>
                      {thousandformater(formatCurrency(afterTrans.licenseCost / 30))}
                    </b>
                  </li>
                  {afterTrans.accountModuleActive && (
                    <li>
                      <span>Accounting Module Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(afterTrans.accountingModuleCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {afterTrans.fbrIntegration && (
                    <li>
                      <span>FBR Integration Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(afterTrans.fbrIntegrationCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {afterTrans.digitalInvoice && (
                    <li>
                      <span>Digital Invoice Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(afterTrans.digitalInvoiceCost / 30)
                        )}
                      </b>
                    </li>
                  )}
                  {afterTrans.noOfCurrrentKitchenDisplays > 0 && (
                    <li>
                      <span>Kitchen Display Cost (daily)</span>
                      <b>
                        {thousandformater(
                          formatCurrency(
                            afterTrans.kitchenDisplayCost /
                              (30 / afterTrans.noOfCurrrentKitchenDisplays)
                          )
                        )}
                      </b>
                    </li>
                  )}
                  <li>
                    <strong>
                      <span>New License Cost (daily)</span>
                    </strong>
                    <b>{thousandformater(formatCurrency(afterTrans.totalCost / 30))}</b>
                  </li>
                  <li>
                    <strong>
                      <span>New License Cost (Monthly):</span>
                    </strong>
                    <b>{thousandformater(formatCurrency(afterTrans.totalCost))}</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ShowHideContainer>

        <div className="pfw-actions">
          <button className="pfw-btn pfw-proceed" onClick={onProceed} ref={proceedRef}>
            Proceed
          </button>
          <button className="pfw-btn pfw-cancel" onClick={onCancel} ref={cancelRef}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* Helpers */
function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return "0.00";
  return parseFloat(value).toFixed(2);
}

const parseDate = (input) => {
  if (!input) return "";
  let date;
  if (input instanceof Date) {
    date = input;
  } else if (typeof input === "string") {
    date = new Date(input);
    if (!isValid(date)) {
      date = parse(input, "MM/dd/yyyy hh:mm:ss a", new Date());
    }
  }
  if (!isValid(date)) return "";
  return format(date, "dd/MMM/yyyy");
};

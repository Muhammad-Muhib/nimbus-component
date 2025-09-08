import React, { useState } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCogs, FaHandHoldingUsd } from "react-icons/fa";
import ShowHideContainer from "../Slider/ShowHideContainer";
import "../../../styles/Popup/PaidFeatureWarning.css";

export default function PaidFeatureWarningPopup({
  show,
  onProceed,
  onCancel,
  currentExpiryDate = "",
  newExpiryDate = "",
  remainingBalance = 0,
  currentCosts = {
    retailDaily: 0,
    accountingDaily: 0,
    kitchenDaily: 0,
    licenseDaily: 0,
    licenseMonthly: 0,
  },
  newCosts = {
    retailDaily: 0,
    accountingDaily: 0,
    kitchenDaily: 0,
    licenseDaily: 0,
    licenseMonthly: 0,
  },
}) {
  const [showDetails, setShowDetails] = useState(false);

  if (!show) return null;

  return createPortal(
    <div className="pfw-overlay">
      <div className="pfw-modal">
        <div className="pfw-header">
          <div className="pfw-icon">
            <FaCogs className="pfw-gear" />
            <FaHandHoldingUsd className="pfw-hand" />
          </div>
          <div className="pfw-title">
            <span className="pfw-warning">Warning!</span>
            <span className="pfw-text">
              This is a paid feature. This will cost you.
            </span>
            <span className="pfw-subtext">
              Your Nimbus subscription expiry date will be changed to:
              <span className="pfw-date"> {newExpiryDate}</span>
            </span>
          </div>
        </div>

        <button
          className="pfw-toggle"
          onClick={() => setShowDetails((s) => !s)}
        >
          {showDetails ? <IoIosArrowUp /> : <IoIosArrowDown />} Show/Hide
          Details
        </button>

        <ShowHideContainer show={showDetails}>
          <div className="pfw-details">
            <div className="pfw-balance">
              Remaining Balance: <span>{formatCurrency(remainingBalance)}</span>
            </div>

            <div className="pfw-panels">
              <div className="pfw-panel pfw-current">
                <div className="pfw-panel-header">
                  <span>Current Expiry Date</span>
                  <strong>{currentExpiryDate}</strong>
                </div>
                <ul>
                  <li>
                    <span>Retail Module Cost (daily)</span>
                    <b>{formatCurrency(currentCosts.retailDaily)}</b>
                  </li>
                  <li>
                    <span>Accounting Module Cost (daily)</span>
                    <b>{formatCurrency(currentCosts.accountingDaily)}</b>
                  </li>
                  <li>
                    <span>Kitchen Display Cost (daily)</span>
                    <b>{formatCurrency(currentCosts.kitchenDaily)}</b>
                  </li>
                  <li>
                    <strong>
                      <span>New License Cost (daily)</span>
                      <b>{formatCurrency(currentCosts.licenseDaily)}</b>
                    </strong>
                  </li>
                  <li>
                    <span>New License Cost (Monthly)</span>
                    <b>{formatCurrency(currentCosts.licenseMonthly)}</b>
                  </li>
                </ul>
              </div>

              <div className="pfw-panel pfw-new">
                <div className="pfw-panel-header">
                  <span>New Expiry Date</span>
                  <strong>{newExpiryDate}</strong>
                </div>
                <ul>
                  <li>
                    <span>Retail Module Cost (daily)</span>
                    <b>{formatCurrency(newCosts.retailDaily)}</b>
                  </li>
                  <li>
                    <span>Accounting Module Cost (daily)</span>
                    <b>{formatCurrency(newCosts.accountingDaily)}</b>
                  </li>
                  <li>
                    <span>Kitchen Display Cost (daily)</span>
                    <b>{formatCurrency(newCosts.kitchenDaily)}</b>
                  </li>
                  <li>
                    <span>New License Cost (daily)</span>
                    <b>{formatCurrency(newCosts.licenseDaily)}</b>
                  </li>
                  <li>
                    <span>New License Cost (Monthly)</span>
                    <b>{formatCurrency(newCosts.licenseMonthly)}</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ShowHideContainer>

        <div className="pfw-actions">
          <button className="pfw-btn pfw-proceed" onClick={onProceed}>
            Proceed
          </button>
          <button className="pfw-btn pfw-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function formatCurrency(value) {
  if (value == null || value === "") return "0.00";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

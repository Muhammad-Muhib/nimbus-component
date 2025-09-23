import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

export default function InfoIcon({
  children,
  title = "",
  body = null,
  placement = "top",
  variant = "default" // default, success, warning, error
}) {
  const [id] = useState(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`);

  if (title.trim() === "" && !body) {
    return <>{children}</>;
  }

  // Define color schemes for different variants
  const variants = {
    default: {
      bg: "#1f2937",
      text: "#ffffff",
      border: "#3b82f6"
    },
    success: {
      bg: "#065f46",
      text: "#ffffff", 
      border: "#10b981"
    },
    warning: {
      bg: "#92400e",
      text: "#ffffff",
      border: "#f59e0b"
    },
    error: {
      bg: "#7f1d1d",
      text: "#ffffff",
      border: "#ef4444"
    }
  };

  const currentVariant = variants[variant] || variants.default;

  const tooltipStyle = {
    backgroundColor: "white",
    color: "black",
    border: `3px solid ${currentVariant.border}`,
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    maxWidth: "280px",
    zIndex: 10000,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(8px)",
    lineHeight: "1.5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  return (
    <>
      {/* Trigger element with hover effect */}
      <span
        data-tooltip-id={id}
        style={{ 
          cursor: "pointer", 
          display: "inline-block",
          transition: "all 0.2s ease",
          borderRadius: "4px"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-1px)";
          e.target.style.filter = "brightness(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.filter = "brightness(1)";
        }}
      >
        <MdInfoOutline size={21} />
      </span>

      {/* Beautiful Tooltip */}
      <Tooltip
        id={id}
        place={placement}
        style={tooltipStyle}
        opacity={0.96}
        delayShow={300}
        delayHide={100}
        clickable={true}
        noArrow={false}
        offset={8}
      >
        <div style={{ position: "relative" }}>
          {title.trim() !== "" && (
            <div style={{ 
              fontWeight: "600", 
              fontSize: "15px",
              marginBottom: body ? "8px" : "0",
              letterSpacing: "0.025em"
            }}>
              {title}
            </div>
          )}
          {body && (
            <div style={{ 
              fontSize: "13px", 
              opacity: "0.9",
              lineHeight: "1.6"
            }}>
              {body}
            </div>
          )}
         
        </div>
      </Tooltip>
    </>
  );
}
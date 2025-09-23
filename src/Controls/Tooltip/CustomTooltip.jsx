import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function CustomTooltip({
  children,
  title = "",
  body = null,
  placement = "auto",
}) {
  const [id] = useState(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`);

  if (title.trim() === "" && !body) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Trigger element */}
      <span
        id={id}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        {children}
      </span>

      {/* Tooltip */}
      <Tooltip
        anchorSelect={`#${id}`}
        place={placement}
        clickable
        style={{
          backgroundColor: "white",
          color: "rgba(0,0,0,0.87)",
          border: "1px solid rgba(0,0,0,0.4)",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "14px",
          maxWidth: "240px",
          zIndex: 9999,
        }}
      >
        <div>
          {title.trim() !== "" && <strong>{title}</strong>}
          {body && <div style={{ marginTop: "6px" }}>{body}</div>}
        </div>
      </Tooltip>
    </>
  );
}

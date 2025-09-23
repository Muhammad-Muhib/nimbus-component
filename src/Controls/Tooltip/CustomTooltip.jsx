import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// Styled Tooltip
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    arrow
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid rgba(0,0,0,0.4)",
    boxShadow: "2px 2px 2px rgba(0,0,0,0.4)",
  },
}));

export default function CustomTooltip({
  children,
  title = "",
  body = null,
  placement = "auto",
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  // detect mobile
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  // close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (title.trim() === "" && !body) {
    return <>{children}</>;
  }

  const tooltipContent = (
    <>
      {title.trim() !== "" && <Typography color="inherit">{title}</Typography>}
      {body}
    </>
  );

  return (
    <HtmlTooltip
      title={tooltipContent}
      placement={placement}
      open={open}
      disableFocusListener
      disableTouchListener
      disableHoverListener={isMobile} // disable hover on mobile
      disableInteractive={false}
    >
      <span
        ref={triggerRef}
        data-tooltip-trigger
        style={{ cursor: "pointer" }}
        onMouseEnter={() => {
          if (!isMobile) setOpen(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setOpen(false);
        }}
        onClick={() => {
          if (isMobile) setOpen((prev) => !prev);
        }}
      >
        {children}
      </span>
    </HtmlTooltip>
  );
}

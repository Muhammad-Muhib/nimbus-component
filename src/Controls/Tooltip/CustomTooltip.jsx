import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// Styled Tooltip
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow disableInteractive={false} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid rgba(0,0,0,0.4)",
    boxShadow: "2px 2px 2px rgba(0,0,0,0.4)",
    pointerEvents: "auto", // allow hover inside tooltip
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
  const tooltipRef = useRef(null);
  const closeTimeout = useRef(null);

  // detect mobile
  const isMobile =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  // close tooltip when clicking outside (trigger + tooltip dono k ilawa)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(event.target) &&
        !tooltipRef.current.contains(event.target)
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
    <div ref={tooltipRef}>
      {title.trim() !== "" && <Typography color="inherit">{title}</Typography>}
      {body}
    </div>
  );

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // add delay before closing
      closeTimeout.current = setTimeout(() => {
        const stillInside =
          (tooltipRef.current && tooltipRef.current.matches(":hover")) ||
          (triggerRef.current && triggerRef.current.matches(":hover"));
        if (!stillInside) {
          setOpen(false);
        }
      }, 250);
    }
  };

  return (
    <HtmlTooltip
      title={tooltipContent}
      placement={placement}
      open={open}
      disableFocusListener
      disableTouchListener
      disableHoverListener={isMobile} // disable hover on mobile
    >
      <span
        ref={triggerRef}
        data-tooltip-trigger
        style={{ cursor: "pointer" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (isMobile) setOpen((prev) => !prev);
        }}
      >
        {children}
      </span>
    </HtmlTooltip>
  );
}

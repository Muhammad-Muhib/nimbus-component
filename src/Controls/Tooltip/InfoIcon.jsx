import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MdInfoOutline } from "react-icons/md";

export default function InfoIcon({ 
  children, 
  title = "", 
  body = "", 
  placement = "bottom" 
}) {
  const [open, setOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const tooltipRef = useRef(null);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      arrow
      placement={placement}
      open={open}
      onClose={() => {
        if (!clickOpen) {
          setOpen(false);
        }
      }}
      // Enable hover listeners for mouse hover functionality
      disableFocusListener
      disableTouchListener={false}
      PopperProps={{
        ref: tooltipRef
      }}
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

  // Handle clicking outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOpen && 
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) &&
        !event.target.closest('[data-tooltip-trigger]')
      ) {
        setClickOpen(false);
        setOpen(false);
      }
    };

    if (clickOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickOpen]);

  const handleClick = () => {
    const newClickOpen = !clickOpen;
    setClickOpen(newClickOpen);
    setOpen(newClickOpen);
  };

  const handleMouseEnter = () => {
    if (!clickOpen) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!clickOpen) {
      setOpen(false);
    }
  };

  if (title.trim() === "" && body === "") {
    return <>{children}</>;
  }

  return (
    <HtmlTooltip
      title={
        <>
          {title.trim() !== "" && <Typography color="inherit">{title}</Typography>}
          {body !== "" && <span>{body}</span>}
        </>
      }
    >
      <span
        data-tooltip-trigger
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <MdInfoOutline size={18} />
      </span>
    </HtmlTooltip>
  );
}

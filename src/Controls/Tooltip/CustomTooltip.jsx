import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function CustomTooltip({ children, title = "", body = "", placement = "bottom" }) {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow placement={placement} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid rgba(0,0,0,0.4)',
      boxShadow: '2px 2px 2px rgba(0,0,0,0.4)',
    },
  }));

  if (title.trim() === "" && body() === "") {
    return <>{children}</>;
  }

  return (
    <HtmlTooltip
      title={
        <>
          {title.trim() !== "" && <Typography color="inherit">{title}</Typography>}
          {body() !== "" && <span>{body}</span>}
        </>
      }
    >
      {children}
    </HtmlTooltip>
  );
}

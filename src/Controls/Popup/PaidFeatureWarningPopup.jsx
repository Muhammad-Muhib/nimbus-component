import React, { useState,useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCogs, FaHandHoldingUsd, FaSpinner } from "react-icons/fa";
import ShowHideContainer from "../Slider/ShowHideContainer";
import apiService from "../../ApiService/apiService";
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
            <img src={`data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzM5LjUxIiBoZWlnaHQ9IjMyMS41NSIgdmlld0JveD0iMCAwIDMzOS41MSAzMjEuNTUiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDojZjllMWMyO30uY2xzLTN7ZmlsbDojOGZkOGY4O30uY2xzLTR7ZmlsbDojZWQzMzM4O30uY2xzLTV7ZmlsbDojZmZmO30uY2xzLTZ7ZmlsbDojOTFkOGY4O30uY2xzLTd7ZmlsbDojZmE3NTllO30uY2xzLTh7ZmlsbDojM2EyYzYwO30uY2xzLTl7Y2xpcC1wYXRoOnVybCgjY2xpcC1wYXRoKTt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1OS4yNiAtMjg4LjQ0KSI+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSI2NTkuMDIiIHk9IjI4OC4yMiIgd2lkdGg9IjM1MiIgaGVpZ2h0PSIzMzQiLz48L2NsaXBQYXRoPjwvZGVmcz48dGl0bGU+ZmVhdHVyZXM8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTk5MC45NCw0NDFhMTcuNTYsMTcuNTYsMCwwLDAtMjMuNi0xLjdMOTExLjEsNDgzLjU4YTE2LjQ0LDE2LjQ0LDAsMCwwLTE0LjYzLTloLTQ0YTExNy44NSwxMTcuODUsMCwwLDEtMzMuMTEtNC43NWwtMTAuMjctM2E3Ni4xOCw3Ni4xOCwwLDAsMC0yOC4yMy0zLjA3Yy0zMS41OSwyLjczLTM5LjUsMjMtNDQuNjYsMjYuODktMS40MiwxLjA2LTE5LjIyLDEyLjYtMjIuNjgsMTQuODRsMzYuOTMsNTcuNDZjMy44LTIuMzUsMjUuMTItMTUuNDcsMjguMi0xNi4zNCwxNC41OC00LjEzLDU2LjEsMTEuNTIsODMuNDIsMTEuNTIsMTYuNTUsMCwzMC4wNi04LjY3LDM4LjEtMTUuNDcsNy4zOS02LjI3LDg5LjU2LTc2LjMyLDg5LjU2LTc2LjMyYTE3LjU1LDE3LjU1LDAsMCwwLDEuMi0yNS4zNVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNOTA4LjM4LDM3Mi43NGEzOC44NywzOC44NywwLDEsMS0zOC44Ny0zOC44NywzOC44NywzOC44NywwLDAsMSwzOC44NywzOC44N1ptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNOTUwLjgyLDM4MS4yN1YzNjQuMjFhNC43NSw0Ljc1LDAsMCwwLTQuNzYtNC43NUg5MzQuNThhNjUuOTEsNjUuOTEsMCwwLDAtOS42OC0yMy4zNEw5MzMsMzI4YTQuNzQsNC43NCwwLDAsMCwwLTYuNzJMOTIxLDMwOS4yMWE0Ljc0LDQuNzQsMCwwLDAtNi43MiwwbC04LjEzLDguMTNhNjYsNjYsMCwwLDAtMjMuMzMtOS42N1YyOTYuMTlhNC43NSw0Ljc1LDAsMCwwLTQuNzUtNC43NUg4NjFhNC43Niw0Ljc2LDAsMCwwLTQuNzYsNC43NXYxMS40OGE2NS45Myw2NS45MywwLDAsMC0yMy4zMSw5LjY3bC04LjEzLTguMTJhNC43NCw0Ljc0LDAsMCwwLTYuNzIsMEw4MDYsMzIxLjI4YTQuNzQsNC43NCwwLDAsMCwwLDYuNzJsOC4xMiw4LjEzYTY2LDY2LDAsMCwwLTkuNjcsMjMuMzNINzkzYTQuNzUsNC43NSwwLDAsMC00Ljc0LDQuNzV2MTcuMDZBNC43NSw0Ljc1LDAsMCwwLDc5MywzODZoMTEuNDhhNjUuOTQsNjUuOTQsMCwwLDAsOS42OCwyMy4zM0w4MDYsNDE3LjQ4YTQuNzMsNC43MywwLDAsMCwwLDYuNzFsMTIuMDYsMTIuMDZhNC43NCw0Ljc0LDAsMCwwLDYuNzIsMGw4LjEzLTguMTJhNjYuMDksNjYuMDksMCwwLDAsMjMuMzIsOS42OVY0NDkuM2E0Ljc2LDQuNzYsMCwwLDAsNC43Niw0Ljc1aDE3YTQuNzUsNC43NSwwLDAsMCw0Ljc1LTQuNzVWNDM3LjgyYTY2LjA2LDY2LjA2LDAsMCwwLDIzLjMzLTkuNjlsOC4xMyw4LjEyYTQuNzMsNC43MywwLDAsMCw2LjcxLDBMOTMzLDQyNC4xOWE0Ljc1LDQuNzUsMCwwLDAsMC02LjcxbC04LjEzLTguMTNBNjYuMTIsNjYuMTIsMCwwLDAsOTM0LjU4LDM4NmgxMS40OGE0Ljc1LDQuNzUsMCwwLDAsNC43Ni00Ljc1Wm0tODEuMywzMC4zNGEzOC44NywzOC44NywwLDEsMSwzOC44Ni0zOC44NywzOC44NSwzOC44NSwwLDAsMS0zOC44NiwzOC44N1ptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PHBhdGggY2xhc3M9ImNscy01IiBkPSJNNzM2LjIxLDQ5OS42MmM1LjE2LTMuODUsMTMuMDctMjQuMTYsNDQuNjYtMjYuODlhNzYuMTgsNzYuMTgsMCwwLDEsMjguMjMsMy4wN2wxMC4yNywzYTExNy40OSwxMTcuNDksMCwwLDAsMzMuMTEsNC43NWg0NGExNi40MywxNi40MywwLDAsMSwxNC42Myw5bDU2LjI0LTQ0LjMzYTE3LjU2LDE3LjU2LDAsMCwxLDI3Ljg0LDkuMywxNy41NiwxNy41NiwwLDAsMC0yNy44NC0xOC4zTDkxMS4xLDQ4My41OGExNi40NCwxNi40NCwwLDAsMC0xNC42My05aC00NGExMTcuODUsMTE3Ljg1LDAsMCwxLTMzLjExLTQuNzVsLTEwLjI3LTNhNzYsNzYsMCwwLDAtMjguMjMtMy4wN2MtMzEuNTksMi43My0zOS41LDIzLTQ0LjY2LDI2Ljg5LTEuNDIsMS4wNS0xOS4yMiwxMi42LTIyLjY4LDE0Ljg0bDQuMDgsNi4zNWM2LjQ3LTQuMTksMTcuNTEtMTEuMzcsMTguNi0xMi4xOFptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNNjY4LjQ1LDUxNy41N2wyNi0xNi43M2ExMy41MSwxMy41MSwwLDAsMSwxOC43LDQuMDZsNDEuNSw2NC41YTEzLjUxLDEzLjUxLDAsMCwxLTQsMTguNzFsLTI2LDE2LjcyYTEzLjQ5LDEzLjQ5LDAsMCwxLTE4LjctNC4wNmwtNDEuNTEtNjQuNDlhMTMuNTIsMTMuNTIsMCwwLDEsNC4wNi0xOC43MVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNNzI2LjM4LDU3OGE3LjUsNy41LDAsMSwxLTcuNS03LjUsNy41LDcuNSwwLDAsMSw3LjUsNy41Wm0wLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTkuMjYgLTI4OC40NCkiLz48cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik03OTMsMzg5SDgwMmE2OC4yOSw2OC4yOSwwLDAsMCw4LjI2LDE5LjkxbC02LjQzLDYuNDJhNy43Niw3Ljc2LDAsMCwwLDAsMTFsMTIuMDcsMTIuMDdhNy45Miw3LjkyLDAsMCwwLDEwLjk1LDBsNi40My02LjQzYTY4LjU5LDY4LjU5LDAsMCwwLDE5LjkxLDguMjd2OS4wN0E3Ljc2LDcuNzYsMCwwLDAsODYxLDQ1N0g4NzhhNy43NSw3Ljc1LDAsMCwwLDcuNzUtNy43NXYtOS4wN0E2OC45LDY4LjksMCwwLDAsOTA1LjcxLDQzMmw2LjQxLDYuNDJhNy43Niw3Ljc2LDAsMCwwLDExLDBsMTIuMDYtMTIuMDdhNy43NCw3Ljc0LDAsMCwwLDAtMTFsLTYuNDMtNi40MkE2OC41OSw2OC41OSwwLDAsMCw5MzcsMzg5aDkuMDdhNy43Nyw3Ljc3LDAsMCwwLDcuNzUtNy43NVYzNjQuMmE3Ljc1LDcuNzUsMCwwLDAtNy43NS03Ljc0SDkzN2E2OC42NCw2OC42NCwwLDAsMC04LjI3LTE5LjkybDYuNDMtNi40MmE3Ljc0LDcuNzQsMCwwLDAsMC0xMWwtMTIuMDYtMTIuMDdhNy43Niw3Ljc2LDAsMCwwLTExLDBsLTYuNDIsNi40M2E2OC42Miw2OC42MiwwLDAsMC0xOS45Mi04LjI2di05LjA3YTcuNzUsNy43NSwwLDAsMC03Ljc1LTcuNzVIODYxYTcuNzYsNy43NiwwLDAsMC03Ljc1LDcuNzV2OS4wN2E2OC44NCw2OC44NCwwLDAsMC0xOS45MSw4LjI2bC02LjQyLTYuNDJhNy45Myw3LjkzLDAsMCwwLTExLDBsLTEyLjA3LDEyLjA2YTcuNzYsNy43NiwwLDAsMCwwLDExbDYuNDMsNi40MkE2OC43Niw2OC43NiwwLDAsMCw4MDIsMzU2LjQ2SDc5M2E3Ljc1LDcuNzUsMCwwLDAtNy43NCw3Ljc0djE3LjA3QTcuNzYsNy43NiwwLDAsMCw3OTMsMzg5Wm0tMS43NC0yNC44MmExLjc0LDEuNzQsMCwwLDEsMS43NS0xLjc0aDExLjQ4YTMsMywwLDAsMCwyLjk0LTIuNCw2Mi42OSw2Mi42OSwwLDAsMSw5LjI0LTIyLjI3LDMsMywwLDAsMC0uMzgtMy43OGwtOC4xMy04LjEzYTEuNzYsMS43NiwwLDAsMSwwLTIuNDhsMTIuMDYtMTIuMDZhMS44LDEuOCwwLDAsMSwyLjQ4LDBsOC4xMyw4LjEzYTMsMywwLDAsMCwzLjc3LjM4LDYyLjc3LDYyLjc3LDAsMCwxLDIyLjI3LTkuMjQsMywzLDAsMCwwLDIuNC0yLjk0VjI5Ni4xOWExLjc1LDEuNzUsMCwwLDEsMS43NS0xLjc1SDg3OGExLjc1LDEuNzUsMCwwLDEsMS43NSwxLjc1djExLjQ4YTMsMywwLDAsMCwyLjQxLDIuOTQsNjIuNjUsNjIuNjUsMCwwLDEsMjIuMjYsOS4yNCwzLDMsMCwwLDAsMy43OC0uMzhsOC4xMy04LjEzYTEuNzYsMS43NiwwLDAsMSwyLjQ4LDBsMTIuMDYsMTIuMDZhMS43NiwxLjc2LDAsMCwxLDAsMi40OEw5MjIuNzgsMzM0YTMsMywwLDAsMC0uMzgsMy43OCw2Mi42Miw2Mi42MiwwLDAsMSw5LjI0LDIyLjI3LDMsMywwLDAsMCwyLjk0LDIuMzloMTEuNDhhMS43NSwxLjc1LDAsMCwxLDEuNzUsMS43NXYxNy4wNmExLjc2LDEuNzYsMCwwLDEtMS43NSwxLjc2SDkzNC41OGEzLDMsMCwwLDAtMi45NCwyLjM5LDYyLjYyLDYyLjYyLDAsMCwxLTkuMjQsMjIuMjcsMywzLDAsMCwwLC4zOCwzLjc4bDguMTMsOC4xM2ExLjc2LDEuNzYsMCwwLDEsMCwyLjQ4bC0xMi4wNiwxMi4wNmExLjc2LDEuNzYsMCwwLDEtMi40OCwwTDkwOC4yNCw0MjZhMywzLDAsMCwwLTMuNzctLjM5LDYyLjYxLDYyLjYxLDAsMCwxLTIyLjI3LDkuMjUsMywzLDAsMCwwLTIuNCwyLjk0djExLjQ4QTEuNzYsMS43NiwwLDAsMSw4NzgsNDUxSDg2MWExLjc2LDEuNzYsMCwwLDEtMS43NS0xLjc1VjQzNy44MmEzLDMsMCwwLDAtMi40LTIuOTQsNjIuNzcsNjIuNzcsMCwwLDEtMjIuMjctOS4yNCwzLDMsMCwwLDAtMy43Ny4zOGwtOC4xNCw4LjEzYTEuODEsMS44MSwwLDAsMS0yLjQ3LDBsLTEyLjA2LTEyLjA3YTEuNzUsMS43NSwwLDAsMSwwLTIuNDdsOC4xMy04LjEzYTMsMywwLDAsMCwuMzgtMy43OCw2Mi42OSw2Mi42OSwwLDAsMS05LjI0LTIyLjI3LDMsMywwLDAsMC0yLjk0LTIuNEg3OTNhMS43NSwxLjc1LDAsMCwxLTEuNzUtMS43NVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PGcgY2xhc3M9ImNscy05Ij48cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik04NjkuNTIsNDE0LjYxYTQxLjg3LDQxLjg3LDAsMSwwLTQxLjg3LTQxLjg3LDQxLjg4LDQxLjg4LDAsMCwwLDQxLjg3LDQxLjg3Wm0wLTc3Ljc0YTM1Ljg3LDM1Ljg3LDAsMSwxLTM1Ljg3LDM1Ljg3LDM1Ljg2LDM1Ljg2LDAsMCwxLDM1Ljg3LTM1Ljg3Wm0wLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NTkuMjYgLTI4OC40NCkiLz48cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik05OTMuMTIsNDM4LjlhMjAuNDcsMjAuNDcsMCwwLDAtMjcuNjMtMmwtNTMuNjQsNDIuMjdhMTkuMzIsMTkuMzIsMCwwLDAtMTUuMzgtNy42MmgtNDRhMTE0Ljc0LDExNC43NCwwLDAsMS0zMi4yNi00LjYzbC0xMC4yOC0zYTc4LjY1LDc4LjY1LDAsMCwwLTI5LjMzLTMuMThjLTI2LjE3LDIuMjYtMzcuMDYsMTYuMTktNDIuOSwyMy42N2EyNi42MiwyNi42MiwwLDAsMS0zLjMsMy44MWMtLjc5LjYtOC42Miw1LjcyLTIwLjE5LDEzLjIxYTE2LjQxLDE2LjQxLDAsMCwwLTIxLjM5LTMuMTFsLTI2LDE2LjcyYTE2LjU1LDE2LjU1LDAsMCwwLTUsMjIuODRsNDEuNDcsNjQuNWExNi41MiwxNi41MiwwLDAsMCwyMi44Niw1bDI2LTE2LjcxYTE2LjU2LDE2LjU2LDAsMCwwLDUtMjIuODVsLTIuNTMtMy45M2MxMy4wOC04LDIzLjEzLTEzLjg3LDI0Ljg0LTE0LjQsNi45NC0yLDIyLDEuMzEsMzcuODksNC43OCwxNS40NiwzLjM3LDMxLjQ0LDYuODUsNDQuNzEsNi44NSwxNy4yOCwwLDMxLjMxLTguNzksNDAtMTYuMTdMOTE3LjI4LDUzMmwxLjA4LS45MmMzLTIuNi0uODUtNy4xNy0zLjktNC41N2wtMS4wOC45Mi0xNS4xNCwxMi45Yy04LDYuNzQtMjAuNywxNC43Ni0zNi4xNiwxNC43Ni0xMi42MywwLTI4LjI5LTMuNDEtNDMuNDMtNi43MS0xNy40LTMuOC0zMi40Mi03LjA4LTQwLjgtNC43LTIuODkuODItMTYuODUsOS4yMy0yNi40NCwxNS4xM2wtMzMuNzUtNTIuNDljNy4xNy00LjY0LDE5LjEtMTIuNCwyMC4zNC0xMy4zM2EyNi42MSwyNi42MSwwLDAsMCw0LjQ0LTQuOTJjNS42NS03LjIzLDE1LjExLTE5LjM1LDM4LjY5LTIxLjM5YTczLjI0LDczLjI0LDAsMCwxLDI3LjEzLDNsMTAuMjgsM2ExMjAuNzQsMTIwLjc0LDAsMCwwLDM0LDQuODdoNDRhMTMuNDksMTMuNDksMCwwLDEtLjA3LDI3SDgxNy45M2MtNCwwLTQsNiwwLDZIODk2LjRhMTkuNDksMTkuNDksMCwwLDAsMTguMzYtMjZsNTQuNDQtNDIuOTFBMTQuNTcsMTQuNTcsMCwwLDEsOTg3LjgsNDY0bC0zNS45NCwzMC42M2MtMy4wNSwyLjYuODUsNy4xNywzLjksNC41N2wzNi0zMC42NWEyMC41NiwyMC41NiwwLDAsMCwxLjQxLTI5LjY3Wk03NDksNTg1LjU5bC0yNiwxNi43M2ExMC41NSwxMC41NSwwLDAsMS0xNC41Ni0zLjE2bC00MS40Ny02NC41MmExMC41NiwxMC41NiwwLDAsMSwzLjE2LTE0LjU2bDI2LTE2LjcyYTEwLjQ1LDEwLjQ1LDAsMCwxLDUuNjgtMS42OCwxMC43MSwxMC43MSwwLDAsMSwyLjI2LjI0LDEwLjQ0LDEwLjQ0LDAsMCwxLDYuNjMsNC42TDc1Mi4xMiw1NzFBMTAuNTQsMTAuNTQsMCwwLDEsNzQ5LDU4NS41OVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PC9nPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTk0Mi4xMyw1MDIuOTRsLTE3LjM1LDE0Ljc5Yy0zLDIuNi44NSw3LjE3LDMuOSw0LjU3TDk0Niw1MDcuNWMzLTIuNTktLjg2LTcuMTYtMy45LTQuNTZabTAsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1OS4yNiAtMjg4LjQ0KSIvPjxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTcxOC44OCw1NjcuNDlhMTAuNSwxMC41LDAsMSwwLDEwLjUsMTAuNSwxMC41MiwxMC41MiwwLDAsMC0xMC41LTEwLjVabTAsMTVhNC41LDQuNSwwLDEsMSw0LjUtNC41LDQuNSw0LjUsMCwwLDEtNC41LDQuNVptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU5LjI2IC0yODguNDQpIi8+PC9zdmc+`} style={{width:"4rem"}} />
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

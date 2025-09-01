import apiService from "../../ApiService/apiService"
import html2canvas from "html2canvas";
import {toast} from "react-toastify"

export const sendEmail = async (tableRef,body,toMail,subject,setShowMailModal,isEmailValid)=>{
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    if (!tableRef.current) {
      toast.error("Table not found");
      return false;
    }

    if(toMail == null || toMail == ""){
      toast.error("Please enter an Email ID.")
      return false;
    }else{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(toMail)){
        toast.error("Please enter a Valid Email ID.")
        return false;
       }
    }
    if(subject == null || subject == ""){
      toast.error("Please enter subject.")
      return false;
    }

    try {
      // Configure html2canvas options for better quality
      const canvas = await html2canvas(tableRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
      });
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("Attachment", blob, `PO.png`);
            formData.append("EmailBody", body);
            formData.append("EmailTo", toMail);
            formData.append("EmailSubject", subject);

            apiService({
              endpoint: apiUrl + "/Email/Send",
              method: "POST",
              data: formData,
              contentType: "multipart/form-data",
            })
              .then((res) => {
                if (res.data.success) {
                  setShowMailModal(false);
                  toast.success("Mail sent successfully");
                  return true;
                } else {
                  setShowMailModal(false);
                  toast(res.error);
                  return false;
                }
              })
              .catch((ex) => {
                setShowMailModal(false);
                console.log(ex);
                toast.error("Something went wrong");
                return false;
              });
          } else {
            setShowMailModal(false);
            toast.error("Failed to create image");
            return false;
          }
        },
        "image/png",
        0.95
      );

      
    } catch (error) {
      console.error("Error converting table to image:", error);
      toast.error("Failed to convert table to image");
      return false;
    }
}
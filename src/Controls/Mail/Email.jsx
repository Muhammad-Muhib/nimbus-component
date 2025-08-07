import apiService from "../../ApiService/apiService"
import html2canvas from "html2canvas";
import {toast} from "react-toastify"

export const sendEmail = async (tableRef,body,toMail,subject,setShowMailModal)=>{
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    if (!tableRef.current) {
      toast.error("Table not found");
      return;
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
                  return;
                } else {
                  setShowMailModal(false);
                  toast(res.error);
                  return;
                }
              })
              .catch((ex) => {
                setShowMailModal(false);
                console.log(ex);
                toast.error("Something went wrong");
                return;
              });
          } else {
            setShowMailModal(false);
            toast.error("Failed to create image");
            return;
          }
        },
        "image/png",
        0.95
      );

      
    } catch (error) {
      console.error("Error converting table to image:", error);
      toast.error("Failed to convert table to image");
    }
}
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default async function apiService({ endpoint, method = 'GET', data = null,contentType = "application/json" }) {
  const navigate = useNavigate();
  try {
    const config = {
      method,
      url: endpoint,
      headers: {
        'Content-Type': `${contentType}`,
        'Authorization': `Bearer ${localStorage.AccessToken}`
      },
    };

    if (method.toUpperCase() == 'GET' && data) {
      config.params = data; // query string for GET
    } else if (data) {
      config.data = data; //  body for POST, PUT
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = error.response?.data?.message || error.message
    errorMessage.includes("Session Expired") 
    return { error: errorMessage,data:{success:false} };
  }
}
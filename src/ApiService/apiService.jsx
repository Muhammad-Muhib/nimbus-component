import axios from "axios";
import Cookies from "js-cookie"
import React,{Fragment} from "react";

export default async function apiService({ endpoint, method = 'GET', data = null }) {
  try {
    const config = {
      method,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('access_token')}`
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
    return { error: error.response?.data?.message || error.message };
  }
}
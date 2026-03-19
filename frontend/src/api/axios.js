import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// assuming BASE_URL is http://localhost:8080

export const axiosMain = axios.create({
  baseURL: BASE_URL || import.meta.env.VITE_SERVER_URL || "http://localhost:8080",
  // withCredentials : true // no reason for now.
});

export const apiGet = async (url) => {
  try {
    const response = await axiosMain.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("⁉ Server Responded with Error");
      console.error('Status: ', error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);

      // ✅ throw a plain Error with a readable message
      throw new Error(error.response.data?.error || `Server error: ${error.response.status}`);

    } else if (error.request) {
      console.error("❌ No response received:");
      throw new Error("No response from server. Check your connection.");

    } else {
      console.error("❌ Request setup error:");
      throw new Error(error.message || "Something went wrong.");
    }
  }
}

export default axiosMain; // shouldn't i just export this?


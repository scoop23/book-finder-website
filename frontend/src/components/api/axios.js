import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
// assuming BASE_URL is http://localhost:8080

export const axiosMain = axios.create({
    baseURL : BASE_URL || import.meta.emv.VITE_SERVER_URL || "http://localhost:8080",
    // withCredentials : true // no reason for now.
});

export const apiGet = async (url)  => {
    try {
        const response = await axiosMain.get(url); //   essentially this will be "http://localhost:8080/{url}"
        return response.data;
    } catch (error) {
        console.error(error.response);
        return;
    }
} 

export default axiosMain;


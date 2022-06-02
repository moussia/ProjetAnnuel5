import axios from "axios";
import { useNavigate } from "react-router-dom";

export const request = async (url, method, data) => {
    const navigate = useNavigate;
    try {
        return await axios({ url, method, data, withCredentials: true });
    }
    catch (err) {
        console.log(err.response.status);
        if (err.response.status === 401) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            navigate('/');
        }
    }
};
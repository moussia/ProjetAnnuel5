import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER;
const request = axios.create({
    baseURL,
    withCredentials: true
})

request.interceptors.response.use(
    response => (response),
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
        }
        return (Promise.reject(error.response.data.err))
    }
)

export default request;
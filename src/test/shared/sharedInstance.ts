import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1/"
})

export default axiosInstance
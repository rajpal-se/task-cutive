import axios from "axios";
import { LS } from "../constants";

export const axiosInstance = axios.create({
    baseURL: "/api/v1",
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(LS.ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const data = error?.response?.data;
        if (data?.success === false) {
            return Promise.reject(
                new Error(data?.message || "API error", { cause: error }),
            );
        }
        return Promise.reject(error);
    },
);

// path: full-stack-basic\react-and-express-image_sns\frontend\src\hooks\useApiClient.js

import axios from "axios";

export const getApiClient = () => {
    const apiClient = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true,
    });

    return apiClient;
};

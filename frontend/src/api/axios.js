

import axios from "axios";
import { backend_url } from "../common";

const API = axios.create({
    baseURL: backend_url
});

API.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

export default API;
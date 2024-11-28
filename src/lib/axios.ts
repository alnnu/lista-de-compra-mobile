import axios from "axios/index";
import {getBaseURL} from "expo/build/dom/base";

const baseRoute: string = "http://192.168.1.105:8080/api/v1"

const apiClient = axios.create({
    baseURL: baseRoute,
    headers: {
        "Content-Type": "application/json",
    },
})

export default apiClient;
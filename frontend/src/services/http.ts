import axios from "axios";
import { API } from "./api";

export const apiClient = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
});

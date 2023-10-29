import axios from 'axios';
import Cookies from "js-cookie";


export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

axios.defaults.withCredentials = true;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
})

$api.interceptors.request.use((config) => {
        config.headers['X-CSRFToken'] =  `${Cookies.get('csrftoken')}`;
        return config;
})


export default $api;

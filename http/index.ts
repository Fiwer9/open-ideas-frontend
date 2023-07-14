import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export default $api;

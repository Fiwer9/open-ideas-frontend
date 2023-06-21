import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config();

export const API_URL = 'http://127.0.0.1:8000/api';
console.log(API_URL)

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
    return config;
})

export default $api;

import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config();

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const API_URL = 'http://127.0.0.1:8000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


export default $api;

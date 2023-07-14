import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config();

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const API_URL = process.env.NEXT_APP_API_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


export default $api;

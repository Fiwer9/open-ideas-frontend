import axios from 'axios';


export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

axios.defaults.withCredentials = true;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
  }
  return config;
})


export default $api;

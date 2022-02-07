import axios from 'axios';

const baseURL = 'https://api-smart-home.herokuapp.com/api/v1/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
});

export default axiosInstance;
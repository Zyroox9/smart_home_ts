import axios from 'axios';

const baseURL = 'https://61fea676a58a4e00173c9950.mockapi.io/api/v1/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
});

export default axiosInstance;
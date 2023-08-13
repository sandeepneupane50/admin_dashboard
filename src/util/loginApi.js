import axios from "axios";

const Base_Url = 'http://localhost:5000';

// login
const loginApi = axios.create({
    baseURL: Base_Url,
    headers: {
        'Content-Type': 'application/json',
    },
})

// signup
const signupApi = axios.post({
    baseURL: Base_Url,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default {loginApi, signupApi};
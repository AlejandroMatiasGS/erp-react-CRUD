import axios from 'axios'

axios.defaults.withCredentials = true;
const miAxios = axios.create({
    baseURL: "http://localhost:777/",
    timeout: 3000
})

export default miAxios;
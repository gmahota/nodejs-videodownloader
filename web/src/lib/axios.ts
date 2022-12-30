import axios from 'axios';

export const api = axios.create({
    baseURL: "https://king-prawn-app-ks3if.ondigitalocean.app/"
})
import axios from "axios";
import { getAuth } from "firebase/auth";

//in production there's no local host, so it is made dynamic
const BASE_URL = import.meta.env.MODE==="development"?"http://localhost:5001/api":"/api"
const api=axios.create({
    baseURL:BASE_URL,
})

api.interceptors.request.use(async (config) => {
    const user = getAuth().currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api
import axios from "axios";

export default class AuthService{

    register(values){
        return axios.post(import.meta.env.VITE_APP_API + "auth/register", values)
    }
    
    login(values){
        return axios.post(import.meta.env.VITE_APP_API + "auth/login", values)
    }

}

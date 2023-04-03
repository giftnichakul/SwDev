import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth/";

const register = async (userData) => {
    try{
        const response = await axios.post(API_URL + "register/", userData);
        console.log(JSON.stringify(response.data));
        console.log(response.data.name);

        if(response.data){
            localStorage.setItem("user", response.data.name);
            return response.data.name;
        }
    }catch(err){
        console.log("authService: register");
        console.log(err);
    }
}

const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if(response.data){
        localStorage.setItem("user", response.data.name);
    }
    console.log(response.data);
    return response.data;
}

const logout = () => {localStorage.setItem("user", null)};

const authService = {register, login, logout, };

export default authService;
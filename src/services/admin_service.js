import axios from "axios"
import authHeader from "./auth_header";

const ADMIN_URL = "http://localhost:8080/api/admin/";

const getUsers = () => {
    return axios.get(ADMIN_URL + "getUsers", { headers: authHeader() });
};

const addRole = (userId, role) => {
    return axios.post(ADMIN_URL + "addRole", {
        userId: userId,
        role: role
    },  { headers: authHeader() });
}; 

const removeRole = (userId, role) => {
    return axios.post(ADMIN_URL + "removeRole", {
        userId: userId,
        role: role
    },  { headers: authHeader() });
}; 

export default {
    getUsers,
    addRole,
    removeRole
}
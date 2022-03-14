import axios from "axios";
import authHeader from "./auth_header";

const ORDER_URL = "http://localhost:8080/api/order/";

const getOrders = () => {
    return axios.get(ORDER_URL + "get", { headers: authHeader() })
};

export default {
    getOrders
};
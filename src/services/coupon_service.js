import axios from "axios"
import authHeader from "./auth_header"

const COUPON_URL = "http://localhost:8080/api/coupon/"

const applyCoupon = (code) => {
    return axios.post(COUPON_URL + "apply", {
        code: code
    }, {headers: authHeader(), withCredentials:true})
};

const removeCoupon = () => {
    console.log("SE hace POST")
    return axios.post(COUPON_URL + "remove", {
    }, {headers: authHeader(), withCredentials:true});
};

const getAll = () => {
    return axios.get(COUPON_URL + "getAll", 
    {headers: authHeader(), withCredentials:true});
};

const generate = (discount, availableUntil) => {
    return axios.post(COUPON_URL + "generate", {
        discount: discount,
        availableUntil: availableUntil
    }, {headers: authHeader(), withCredentials:true});
};

export default {
    applyCoupon,
    removeCoupon,
    getAll,
    generate,
}
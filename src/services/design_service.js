import axios from 'axios';
import authHeader from './auth_header';

const DESIGN_URL = "http://localhost:8080/api/design/";
const INGREDIENT_URL = "http://localhost:8080/api/ingredient/";
const INGREDIENT_TYPE_URL = "http://localhost:8080/api/ingredientType/";
const ORDER_URL = "http://localhost:8080/api/order/";

const getIngredients = () => {
    return axios.get(INGREDIENT_URL + "get", { headers: authHeader() });
};

const getIngredientsType = () => {
    return axios.get(INGREDIENT_URL + "getTypes", { headers: authHeader() });
};

const getBurgerSizes = () => {
    return axios.get(DESIGN_URL + "getSizes", { headers: authHeader() });
};

const addDesign = (name, size, ingredients) => {
    return axios.post(DESIGN_URL + "add", {
        name: name,
        size: size,
        ingredients: ingredients
    }, { headers: authHeader(),  withCredentials:true  });
};

const getBurgers = () => {
    return axios.get(ORDER_URL + "burgers", { headers: authHeader(), withCredentials:true });
};

const confirmOrder = (name, street, city, state, zip, freeDelivery) => {
    return axios.post(ORDER_URL + "complete", {
        name: name,
        street: street,
        city: city,
        state: state,
        zip: zip,
        freeDelivery: freeDelivery
    }, { headers: authHeader(), withCredentials:true });
};

const removeIngredient = (burgerInOrderId, ingredientId) => {
    return axios.patch(DESIGN_URL + "removeIngredient", {
        burgerInOrderId: burgerInOrderId,
        ingredientId: ingredientId
    }, { headers: authHeader(), withCredentials:true });
};

const removeBurger = (burgerInOrderId) => {
    return axios.patch(DESIGN_URL + "removeBurger", {
        burgerInOrderId: burgerInOrderId
    }, { headers: authHeader(), withCredentials:true });
}

const freeDelivery = () => {
    return axios.post(ORDER_URL + "freeDelivery", 
        { headers: authHeader(), withCredentials:true });
};

export default {
    getIngredients,
    getIngredientsType,
    getBurgerSizes,
    addDesign,
    getBurgers,
    confirmOrder,
    removeIngredient,
    removeBurger,
    freeDelivery
};
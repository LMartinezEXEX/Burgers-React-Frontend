import axios from 'axios';
import authHeader from './auth_header';

const INGREDIENT_URL = "http://localhost:8080/api/ingredient/";

const deleteIngredient = (ingredientId) => {
    return axios.patch(INGREDIENT_URL + "delete", {
        ingredientId: ingredientId
    }, {headers: authHeader(), withCredentials:true});
}

const addIngredient = (name, price, description, type) => {
    return axios.post(INGREDIENT_URL + "add", {
        name: name,
        price: price,
        description: description,
        type: type
    }, {headers: authHeader(), withCredentials:true});
}

export default {
    deleteIngredient,
    addIngredient,
}
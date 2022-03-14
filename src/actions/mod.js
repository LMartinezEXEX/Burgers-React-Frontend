import {
    SET_MESSAGE
} from "./types";

import mod_service from "../services/mod_service";

export const deleteIngredient = (ingredientId) => (dispatch) => {
    return mod_service.deleteIngredient(ingredientId).then(
        () => {
            return Promise.resolve();
        }, 
        (error) => {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const addIngredient = (name, price, description, type) => (dispatch) => {
    return mod_service.addIngredient(name, price, description, type).then(
        () => {
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || 
                error.message || 
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
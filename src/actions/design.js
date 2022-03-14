import {
    SAVE_TYPES,
    SET_MESSAGE
} from "./types";

import design_service from "../services/design_service";

export const addDesign = (name, size, ingredients) => (dispatch) => {
    return design_service.addDesign(name, size, ingredients).then(
        (response) => {
            return Promise.resolve(response);
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

            console.log(error.response);
            return Promise.reject();
        }
    );
};

export const getIngredients = () => (dispatch) => {
    return design_service.getIngredients().then(
        (response) => {
            return Promise.resolve(response.data);
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

export const confirmOrder = (name, street, city, state, zip) => (dispatch) => {
    return design_service.confirmOrder(name, street, city, state, zip).then(
        (response) => {
            return Promise.resolve(response);
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

export const getBurgers = () => (dispatch) => {
    return design_service.getBurgers().then(
        (response) => {
            return Promise.resolve(response);
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

export const removeIngredient = (burgerInOrderId, ingredientId) => (dispatch) => {
    return design_service.removeIngredient(burgerInOrderId, ingredientId).then(
        (response) => {
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

export const saveTypes = (types) => ({
    type: SAVE_TYPES,
    types: types
})
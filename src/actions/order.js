import {
    SET_MESSAGE
} from "./types";

import order_service from "../services/order_service";

export const getOrders = () => (dispatch) => {
    return order_service.getOrders().then(
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
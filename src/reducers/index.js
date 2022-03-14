import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cart from "./cart";
import design from "./design";

export default combineReducers({
    auth,
    message,
    cart,
    design
});
import {
    ADD_BURGER,
    APPLY_COUPON,
    APPLY_FREE_DELIVERY,
    COMPLETE_ORDER,
    REMOVE_BURGER,
    REMOVE_COUPON,
    REMOVE_INGREDIENT
} from "../actions/types";

const initialState = {  subtotal: 0, 
                        coupon: 0,
                        burgers: [],
                        freeDelivery: false
                    }

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_BURGER:
            return {
                ...state,
                subtotal: state.subtotal + action.burger.price,
                burgers: state.burgers.concat([action.burger])
            }

        case REMOVE_BURGER:
            let nonRemovedBurgers = state.burgers.filter(burger => burger.burgerInOrderId !== action.burger.burgerInOrderId);
            return {
                ...state,
                subtotal: state.subtotal - action.burger.price,
                burgers: nonRemovedBurgers
            }
        
        case REMOVE_INGREDIENT:
            var updatedBurgers = state.burgers.map((burger, _) => {

                if(burger.burgerInOrderId === action.burgerInOrderId){
                    burger.price = burger.price - action.price
                }

                return burger;
            });

            return {
                ...state,
                subtotal: state.subtotal- action.price,
                burgers: updatedBurgers
            }
        
        case COMPLETE_ORDER:
            return {
                ...state,
                subtotal: 0,
                coupon: 0,
                burgers: [],
                freeDelivery: false
            }

        case APPLY_COUPON:
            return {
                ...state,
                coupon: action.discount
            }
        
        case REMOVE_COUPON:
            return {
                ...state,
                coupon: 0
            }
        
        case APPLY_FREE_DELIVERY:
            return {
                ...state,
                freeDelivery: true
            }
            
        default:
            return state;
    }
};
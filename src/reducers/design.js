import { SAVE_TYPES } from "../actions/types";

const initialState = {
    types: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SAVE_TYPES:
            return {
                ...state,
                types: action.types
            }
        
        default:
            return state;
    }
} 
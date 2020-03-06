import { VIEW_MLA } from "../constants/action-types.js";

const initialState = {
    mla: {}
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case VIEW_MLA:
            return { ...state, mla: action.mlaId }            
        default:
            return state;
    }

}

export default rootReducer; 
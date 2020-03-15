import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_RESULTS } from "../constants/action-types.js";

const initialState = {
    mla: {},
    searchResults: {}
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case VIEW_MLA:
            return { ...state, mla: action.mlaId }
        case UPDATE_RESULTS:
            return { ...state, searchResults: action.results }
        default:
            return state;
    }

}

export default rootReducer; 
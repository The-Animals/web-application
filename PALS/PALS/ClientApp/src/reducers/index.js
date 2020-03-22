import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_RESULTS } from "../constants/action-types.js";
import { UPDATE_SUMMARY_VIEW } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";

const initialState = {
    mla: {},
    searchResults: [],
    summaries: [],
    summaryView: [],    
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case VIEW_MLA:
            return { ...state, mla: action.mlaId }
        case UPDATE_RESULTS:
            return { ...state, searchResults: action.results }
        case UPDATE_ALL_SUMMARIES:
            return { ...state, summaries: action.summaries }
        case UPDATE_SUMMARY_VIEW:
            return { ...state, summaryView: action.summaryView }
        default:
            return state;
    }

}

export default rootReducer; 
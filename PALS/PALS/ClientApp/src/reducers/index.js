import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_RESULTS } from "../constants/action-types.js";
import { UPDATE_SUMMARY_FILTER } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";

const initialState = {
    mla: {},
    searchResults: [],
    summaries: [],
    summaryFilter:
    {
        mlaId: 0,
        startDate: new Date("2015-05-21T13:30:00"),
        endDate: new Date("2020-05-21T13:30:00"),
        query: "",
    },    
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case VIEW_MLA:
            return { ...state, mla: action.mlaId }
        case UPDATE_RESULTS:
            return { ...state, searchResults: action.results }
        case UPDATE_ALL_SUMMARIES:
            return { ...state, summaries: action.summaries }
        case UPDATE_SUMMARY_FILTER:
            return { ...state, summaryFilter: action.summaryFilter }
        default:
            return state;
    }

}

export default rootReducer; 
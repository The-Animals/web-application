import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_SUMMARY_FILTER } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";
import { UPDATE_ALL_MLAS } from "../constants/action-types.js";
import { UPDATE_SUMMARY_OFFSET } from "../constants/action-types.js";

import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE
} from "../constants/fetch-action-types.js";

const initialState = {
    mlas: [],
    mla: {},
    summaries: [],
    summaryFilter:
    {
        mlaId: 0,
        caucus: "",
        startDate: new Date("2015-05-21T13:30:00"),
        endDate: new Date("2020-05-21T13:30:00"),
        query: "",
    },
    summaryOffset: 0,
    loading: false,
    error: null
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case VIEW_MLA:
            return { ...state, mla: action.mlaId }
        case UPDATE_ALL_MLAS:
            return { ...state, mlas: action.mlas }
        case UPDATE_ALL_SUMMARIES:
            return { ...state, summaries: state.summaries.concat(action.summaries) }
        case UPDATE_SUMMARY_FILTER:
            return { ...state, summaryFilter: action.filter }
        case UPDATE_SUMMARY_OFFSET:
            if (state.summaryOffset < 10000) {
                return { ...state, summaryOffset: state.summaryOffset + action.offset }
            } else {
                return { ...state, summaryOffset: state.summaryOffset }
            }
        case FETCH_SUMMARIES_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARIES_SUCCESS:
            return { ...state, loading: false };
        case FETCH_SUMMARIES_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }

}

export default rootReducer; 
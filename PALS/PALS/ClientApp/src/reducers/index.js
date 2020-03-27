﻿import {
    FETCH_MLA_LIST_BEGIN,
    FETCH_MLA_LIST_SUCCESS,
    FETCH_MLA_LIST_ERROR,
    MLA_SELECTED
} from '../constants/mlaListActionTypes.js';

import {
    FETCH_MLA_SUMMARIES_BEGIN, 
    FETCH_MLA_SUMMARIES_SUCCESS, 
    FETCH_MLA_SUMMARIES_ERROR
} from '../constants/mlaSummariesActionTypes.js';

import {
    FETCH_MLA_PARTICIPATION_BEGIN, 
    FETCH_MLA_PARTICIPATION_SUCCESS, 
    FETCH_MLA_PARTICIPATION_ERROR
} from '../constants/mlaParticipationActionTypes.js';

import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE,
    UPDATE_SUMMARY_OFFSET,
    UPDATE_SUMMARY_FILTER
} from "../constants/summaryTableActionTypes.js";

const MAX_SUMMARY_LIMIT = 10000;

const initialState = {
    mlas: [],
    mla: {},
    mlaSummaries: [],
    mlaParticipation: [],
    allSummaries: [],
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
        case FETCH_MLA_LIST_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_MLA_LIST_SUCCESS:
            return { ...state, loading: false , mlas: action.payload.mlas};
        case FETCH_MLA_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        case MLA_SELECTED: 
            return { ...state, mla: action.payload.mla };
        case FETCH_MLA_SUMMARIES_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_MLA_SUMMARIES_SUCCESS:
            return { ...state, loading: false, mlaSummaries: action.payload.mlaSummaries };
        case FETCH_MLA_SUMMARIES_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        case FETCH_MLA_PARTICIPATION_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_MLA_PARTICIPATION_SUCCESS:
            return { ...state, loading: false, mlaParticipation: action.payload.participation };
        case FETCH_MLA_PARTICIPATION_ERROR:
            return { ...state, loading: false, error: action.payload.error };
        case FETCH_SUMMARIES_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARIES_SUCCESS:
            return { ...state, loading: false, allSummaries: action.payload.allSummaries };
        case FETCH_SUMMARIES_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case UPDATE_SUMMARY_FILTER:
            return { ...state, summaryFilter: action.payload.filter }
        case UPDATE_SUMMARY_OFFSET:
            if (state.summaryOffset < MAX_SUMMARY_LIMIT) {
                return { ...state, summaryOffset: state.summaryOffset + action.offset }
            } else {
                return { ...state, summaryOffset: state.summaryOffset }
            }
    
        default:
            return state;
    }

}

export default rootReducer; 
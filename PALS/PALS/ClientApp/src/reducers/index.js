﻿import {
    FETCH_MLA_LIST_BEGIN,
    FETCH_MLA_LIST_SUCCESS,
    FETCH_MLA_LIST_ERROR,
    MLA_SELECTED
} from '../constants/mlaListActionTypes.js';

import {
    FETCH_MLA_SUMMARIES_BEGIN, 
    FETCH_MLA_SUMMARIES_SUCCESS, 
    FETCH_MLA_SUMMARIES_ERROR,
    FETCH_MLA_SUMMARIES_ABORT,
    SET_MLA_SUMMARY_DATE_FILTER
} from '../constants/mlaSummariesActionTypes.js';

import {
    FETCH_MLA_PARTICIPATION_BEGIN,
    FETCH_MLA_PARTICIPATION_SUCCESS,
    FETCH_MLA_PARTICIPATION_ERROR,
    FETCH_MLA_PARTICIPATION_ABORT
} from '../constants/mlaParticipationActionTypes.js';

import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE,
    UPDATE_SUMMARY_OFFSET,
    UPDATE_SUMMARY_FILTER,
    SET_FIRST_TIME_LOAD
} from "../constants/summaryTableActionTypes.js";

const MAX_SUMMARY_LIMIT = 10000;

const initialState = {
    mlas: [],
    mla: {},
    mlaSummaries: [],
    mlaSummariesAbort: new AbortController(),
    mlaSummaryDateFilter: [],
    mlaParticipation: [],
    mlaParticipationAbort: new AbortController(),
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
    mlaSummariesLoading: false,
    mlaParticipationLoading: false,
    error: null,
    firstTimeLoad: false,
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
            return { ...state, mlaSummariesLoading: true, error: null };
        case FETCH_MLA_SUMMARIES_SUCCESS:
            return { ...state, mlaSummariesLoading: false, mlaSummaries: action.payload.mlaSummaries };
        case FETCH_MLA_SUMMARIES_ERROR:
            return { ...state, error: action.payload.error };
        case FETCH_MLA_SUMMARIES_ABORT:
            return { ...state, mlaSummariesAbort: new AbortController() };
        case SET_MLA_SUMMARY_DATE_FILTER: 
            return { ...state, mlaSummaryDateFilter: action.payload.mlaSummaryDateFilter }
        case FETCH_MLA_PARTICIPATION_BEGIN:
            return { ...state, mlaParticipationLoading: true, error: null };
        case FETCH_MLA_PARTICIPATION_SUCCESS:
            return { ...state, mlaParticipationLoading: false, mlaParticipation: action.payload.participation };
        case FETCH_MLA_PARTICIPATION_ERROR:
            return { ...state, error: action.payload.error };
        case FETCH_MLA_PARTICIPATION_ABORT:
            return { ...state, mlaParticipationAbort: new AbortController() };
        case FETCH_SUMMARIES_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_SUMMARIES_SUCCESS:
            return { ...state, loading: false, allSummaries: state.allSummaries.concat(action.payload.allSummaries) };
        case FETCH_SUMMARIES_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case UPDATE_SUMMARY_FILTER:
            return { ...state, summaryFilter: action.payload.filter }
        case UPDATE_SUMMARY_OFFSET:
            if (state.summaryOffset < MAX_SUMMARY_LIMIT) {                
                return { ...state, summaryOffset: state.summaryOffset + action.payload.offset }
            } else {
                return { ...state, summaryOffset: state.summaryOffset }
            }
        case SET_FIRST_TIME_LOAD:
            return { ...state, firstTimeLoad: true };

        default:
            return state;
    }

}

export default rootReducer;

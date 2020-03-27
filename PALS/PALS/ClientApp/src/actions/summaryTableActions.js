import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE,
    UPDATE_SUMMARY_FILTER,
    UPDATE_SUMMARY_OFFSET
} from "../constants/summaryTableActionTypes.js";

export const fetchSummariesBegin = () => ({
    type: FETCH_SUMMARIES_BEGIN
});

export const fetchSummariesSuccess = allSummaries => ({
    type: FETCH_SUMMARIES_SUCCESS,
    payload: { allSummaries }
});

export const fetchSummariesFailure = error => ({
    type: FETCH_SUMMARIES_FAILURE,
    payload: { error }
});

export const updateSummaryFilter = filter => ({
    type: UPDATE_SUMMARY_FILTER,
    payload: { filter }
});

export const updateSummaryOffset = offset => ({
    type: UPDATE_SUMMARY_OFFSET,
    payload: { offset }
});

export function fetchSummaries() {
    return (dispatch, getState) => {
        dispatch(fetchSummariesBegin());
        return fetch('api/Summary/all/1000/' + getState().summaryOffset)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchSummariesSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchSummariesFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

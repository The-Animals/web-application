import { 
    FETCH_MLA_SUMMARIES_BEGIN, 
    FETCH_MLA_SUMMARIES_SUCCESS, 
    FETCH_MLA_SUMMARIES_ERROR,
    SET_MLA_SUMMARY_DATE_FILTER
} from '../constants/mlaSummariesActionTypes.js';

export const fetchMlaSummariesBegin = () => ({ 
    type: FETCH_MLA_SUMMARIES_BEGIN
});

export const fetchMlaSummariesSuccess = mlaSummaries => ({
    type: FETCH_MLA_SUMMARIES_SUCCESS,
    payload: { mlaSummaries }
});

export const fetchMlaSummariesError = error => ({
    type: FETCH_MLA_SUMMARIES_ERROR, 
    payload: { error }
});

export const setMlaSummaryDateFilter = mlaSummaryDateFilter => ({
    type: SET_MLA_SUMMARY_DATE_FILTER, 
    payload: { mlaSummaryDateFilter }
})

export function fetchMlaSummaries(mlaId) {
    return (dispatch) => {
        dispatch(fetchMlaSummariesBegin());
        return fetch('api/summary/' + mlaId)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchMlaSummariesSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchMlaSummariesError(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
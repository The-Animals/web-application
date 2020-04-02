import { 
    FETCH_MLA_SUMMARIES_BEGIN, 
    FETCH_MLA_SUMMARIES_SUCCESS, 
    FETCH_MLA_SUMMARIES_ERROR,
    FETCH_MLA_SUMMARIES_ABORT,
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

export const fetchMlaSummariesAbort = () => ({
    type: FETCH_MLA_SUMMARIES_ABORT
});

export const setMlaSummaryDateFilter = mlaSummaryDateFilter => ({
    type: SET_MLA_SUMMARY_DATE_FILTER, 
    payload: { mlaSummaryDateFilter }
})

function abortableFetch(signal, dispatch, mlaId) {
    dispatch(fetchMlaSummariesBegin());
    return fetch('api/summary/' + mlaId, { signal })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchMlaSummariesSuccess(json));
            return json;
        })
        .catch(error => dispatch(fetchMlaSummariesError(error)));
}

export function fetchMlaSummaries(mlaId) {
    return (dispatch, getState) => {
        
        // Cancel previous request, and create another one.
        if (getState().mlaSummariesLoading) {

            setTimeout(() => {

                getState().mlaSummariesAbort.abort();
                dispatch(fetchMlaSummariesAbort());

                const { signal } = getState().mlaSummariesAbort;
                return abortableFetch(signal, dispatch, mlaId);

            }, 100);
        } else {

            const { signal } = getState().mlaSummariesAbort;
            return abortableFetch(signal, dispatch, mlaId);
        }        

    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
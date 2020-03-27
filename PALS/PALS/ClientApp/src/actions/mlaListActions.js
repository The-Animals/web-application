import {
    FETCH_MLA_LIST_BEGIN, 
    FETCH_MLA_LIST_SUCCESS, 
    FETCH_MLA_LIST_ERROR
} from '../constants/mlaListActionTypes';

export const fetchMlaListBegin = () => ({ 
    type: FETCH_MLA_LIST_BEGIN
});

export const fetchMlaListSuccess = mlas => ({
    type: FETCH_MLA_LIST_SUCCESS,
    payload: { mlas }
});

export const fetchMlaListError = error => ({
    type: FETCH_MLA_LIST_ERROR, 
    payload: { error }
});

export function fetchMlas() {
    return (dispatch) => {
        dispatch(fetchMlaListBegin());
        return fetch('api/mla/all')
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchMlaListSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchMlaListError(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
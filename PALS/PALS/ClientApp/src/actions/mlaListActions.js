﻿import {
    FETCH_MLA_LIST_BEGIN,
    FETCH_MLA_LIST_SUCCESS,
    FETCH_MLA_LIST_ERROR,
    MLA_SELECTED
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

export const mlaSelected = mla => ({
    type: MLA_SELECTED,
    payload: { mla }
});

export function fetchMlas() {
    return (dispatch) => {
        dispatch(fetchMlaListBegin());
        return fetch('api/mla/all')
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                
                const defaultMLA = {
                    id: 0,
                    name: "ALL",
                    riding: "ALL",
                    ridingNumber: 0,
                    constituencyPhone: null,
                    legislaturePhone: null,
                    email: null,
                    party: null,
                    similar: 0,
                    different: 0
                };
                
                const mlas = [defaultMLA].concat(json);

                dispatch(fetchMlaListSuccess(mlas));
                return mlas;
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

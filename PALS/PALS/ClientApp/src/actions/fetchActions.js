import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE
} from "../constants/fetch-action-types.js";

import { updateSummaries } from '../actions/index.js';

export const fetchSummariesBegin = () => ({
    type: FETCH_SUMMARIES_BEGIN
});

export const fetchSummariesSuccess = Summaries => ({
    type: FETCH_SUMMARIES_SUCCESS,
    payload: { Summaries }
});

export const fetchSummariesFailure = error => ({
    type: FETCH_SUMMARIES_FAILURE,
    payload: { error }
});

function mapMlasToObject(mlas) {

    return mlas.reduce(function (map, obj) {
        map[obj.id] = obj;
        return map;
    }, {});

}

function mapMlaPartyToSummaries(mlas, summaries) {

    return summaries.map(function (summary) {
        var newSummary = Object.assign({}, summary);
        newSummary.caucus = mlas[summary.mlaId].party;
        return newSummary;
    });

}

export function fetchSummaries() {
    return (dispatch, getState) => {
        dispatch(fetchSummariesBegin());
        return fetch('api/Summary/all/1000/' + getState().summaryOffset)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {

                dispatch(fetchSummariesSuccess(json));

                const mlas = mapMlasToObject(getState().mlas);
                const resultsSummaries = mapMlaPartyToSummaries(mlas, json);

                dispatch(updateSummaries(resultsSummaries));

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
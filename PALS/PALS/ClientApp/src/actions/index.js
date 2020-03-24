import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_SUMMARY_FILTER } from "../constants/action-types.js";
import { UPDATE_ALL_MLAS } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";
import { UPDATE_SUMMARY_OFFSET } from "../constants/action-types.js";

import {
    FETCH_SUMMARIES_BEGIN,
    FETCH_SUMMARIES_SUCCESS,
    FETCH_SUMMARIES_FAILURE
} from "../constants/fetch-action-types.js";

export function viewMLA(mlaId) {
    return { type: VIEW_MLA, mlaId }
};

export function updateSummaryFilter(filter) {
    return { type: UPDATE_SUMMARY_FILTER, filter }
};

export function updateSummaries(summaries) {
    return { type: UPDATE_ALL_SUMMARIES, summaries }
};

export function updateMlas(mlas) {
    return { type: UPDATE_ALL_MLAS, mlas }
}

export function updateSummaryOffset(offset) {
    return { type: UPDATE_SUMMARY_OFFSET, offset }
}

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

// TODO: Move this to its own file.
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
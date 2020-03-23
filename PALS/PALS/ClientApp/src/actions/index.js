import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_SUMMARY_FILTER } from "../constants/action-types.js";
import { UPDATE_ALL_MLAS } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";

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
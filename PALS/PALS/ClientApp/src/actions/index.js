import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_RESULTS } from "../constants/action-types.js";
import { UPDATE_SUMMARY_VIEW } from "../constants/action-types.js";
import { UPDATE_ALL_SUMMARIES } from "../constants/action-types.js";

// TODO: Incorrect naming: Change mlaId to ridingNumber.
export function viewMLA(mlaId) {
    return { type: VIEW_MLA, mlaId }
};

// TODO: Remove search results, instead use summary view for
// currently filtered summaries.
export function updateSearchResults(results) {
    return { type: UPDATE_RESULTS , results }
};

export function updateSummaryView(summaries) {
    return { type: UPDATE_SUMMARY_VIEW, summaries }
};

export function updateSummaries(summaries) {
    return { type: UPDATE_ALL_SUMMARIES, summaries }
}
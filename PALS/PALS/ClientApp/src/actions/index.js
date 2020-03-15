import { VIEW_MLA } from "../constants/action-types.js";
import { UPDATE_RESULTS } from "../constants/action-types.js";

export function viewMLA(mlaId) {
    return { type: VIEW_MLA, mlaId }
};

export function updateSearchResults(results) {
    return { type: UPDATE_RESULTS , results }
}
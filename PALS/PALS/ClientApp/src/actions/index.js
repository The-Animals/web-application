import { VIEW_MLA } from "../constants/action-types.js";

export function viewMLA(mlaId) {
    return { type: VIEW_MLA, mlaId }
};
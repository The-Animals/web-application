import { 
    FETCH_MLA_PARTICIPATION_BEGIN, 
    FETCH_MLA_PARTICIPATION_SUCCESS, 
    FETCH_MLA_PARTICIPATION_ERROR
} from '../constants/mlaParticipationActionTypes';

export const fetchMlaParticipationBegin = () => ({ 
    type: FETCH_MLA_PARTICIPATION_BEGIN
});

export const fetchMlaParticipationSuccess = participation => ({
    type: FETCH_MLA_PARTICIPATION_SUCCESS,
    payload: { participation }
});

export const fetchMlaParticipationError = error => ({
    type: FETCH_MLA_PARTICIPATION_ERROR, 
    payload: { error }
});

export function fetchMlaParticipation(mlaId) {
    return (dispatch) => {
        dispatch(fetchMlaParticipationBegin());
        return fetch('api/summary/participation/' + mlaId)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchMlaParticipationSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchMlaParticipationError(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
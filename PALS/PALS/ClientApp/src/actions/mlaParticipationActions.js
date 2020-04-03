import { 
    FETCH_MLA_PARTICIPATION_BEGIN, 
    FETCH_MLA_PARTICIPATION_SUCCESS, 
    FETCH_MLA_PARTICIPATION_ERROR,
    FETCH_MLA_PARTICIPATION_ABORT
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

export const fetchMlaParticipationAbort = () => ({
    type: FETCH_MLA_PARTICIPATION_ABORT
});

function abortableFetch(signal, dispatch, mlaId) {

    dispatch(fetchMlaParticipationBegin());
    return fetch('api/summary/participation/' + mlaId, { signal })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchMlaParticipationSuccess(json));
            return json;
        })
        .catch(error => dispatch(fetchMlaParticipationError(error)));

}

export function fetchMlaParticipation(mlaId) {
    
    return (dispatch, getState) => {

        // Cancel previous request, and create another one.
        if (getState().mlaParticipationLoading) {

            setTimeout(() => {
                
                getState().mlaParticipationAbort.abort();
                dispatch(fetchMlaParticipationAbort());

                const { signal } = getState().mlaParticipationAbort;
                return abortableFetch(signal, dispatch, mlaId);

            }, 100);
        } else {

            const { signal } = getState().mlaParticipationAbort;
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
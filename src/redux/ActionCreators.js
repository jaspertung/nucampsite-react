import * as ActionTypes from './ActionTypes'
import { CAMPSITES } from '../shared/campsites'

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text:  text
    }
})

export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading())

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES))
    }, 2000)
}
// uses thunk so can nest functions
// simulating server request with setTimeout

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
})
// this action will be dispatched by fetchCampsites

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
})
// action that returns an error message

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
})
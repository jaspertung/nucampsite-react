import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

// ------------ comments (add and failed)-----------------------------
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response =>response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text:  text
    }
})

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

// ----------------- campsites (add, loading, failed) ------------------
export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading())

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response => response.json())
        // converts response (array of campsites) from json to JS
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)))
        // catches thrown errors
}
// uses thunk so can nest functions
// was simulating server request with setTimeout

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
})

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
})
// this action will be dispatched by fetchCampsites

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
})
// action that returns an error message

// ----------- promotions (add, loading, failed) ----------------------
export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading())

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if(response.ok) {
                    return response
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`)
                    error.response = response
                    throw error
                    // if there is a response, but it's a bad status
                }
            },
            error => {
                const errMess= new Error(error.message)
                throw errMess
                // if no response
            }
        )
        .then(response => response.json())
        // converts response (array of campsites) from json to JS
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)))
}

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
})

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
})
// this action will be dispatched by fetchCampsites

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
})
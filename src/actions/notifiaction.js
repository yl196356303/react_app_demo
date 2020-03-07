import actionTyep from './actionType'
import { getNotifiactionList } from '../api'

const startFetch = () => {
    return {
        type: actionTyep.START_FETCH_NOTIFICATION
    }
}

const finishFetch = () => {
    return {
        type: actionTyep.FINISH_FETCH_NOTIFICATION
    }
}

export const notificationRead = id => dispatch => {
    dispatch(startFetch())
    setTimeout(() => {
        dispatch({
            type: actionTyep.MARK_NOTIFICATION_AS_READ,
            payload: {
                id
            }
        })
        dispatch(finishFetch())
    }, 500)
}

export const notificationAllRead = () => dispatch => {
    dispatch(startFetch())
    setTimeout(() => {
        dispatch({
            type: actionTyep.MARK_NOTIFICATION_AS_ALLREAD
        })
        dispatch(finishFetch())
    }, 1000)
}

export const getNotifiactions = () => async dispatch => {
    dispatch(startFetch())
    const res = await getNotifiactionList()
    dispatch({
        type: actionTyep.RECIVDE_NOTIFIACTION,
        payload: {
            list: res.result.list
        }
    })
    dispatch(finishFetch())
}

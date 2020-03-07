import actionType from '../actions/actionType'

const initState = {
    isloading: false,
    notificationList: [
        {
            id: 1,
            title: 'title why is or ti',
            desc: 'dsads sda asdsamdsalk dsakldsad sadkladsa  sldak;a',
            hasRead: false
        },
        {
            id: 2,
            title: 'title why is or ti',
            desc: 'dsads sda asdsamdsalk dsakldsad sadkladsa  sldak;a',
            hasRead: false
        },
        {
            id: 1,
            title: 'title why is or ti',
            desc: 'dsads sda asdsamdsalk dsakldsad sadkladsa  sldak;a',
            hasRead: true
        }
    ]
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.START_FETCH_NOTIFICATION:
            return {
                ...state,
                isloading: true
            }
        case actionType.FINISH_FETCH_NOTIFICATION:
            return {
                ...state,
                isloading: false
            }
        case actionType.RECIVDE_NOTIFIACTION:
            return {
                ...state,
                notificationList: action.payload.list
            }
        case actionType.MARK_NOTIFICATION_AS_READ: 
            const newNotificationList = state.notificationList.map(item => {
                if (item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                notificationList: newNotificationList
            }
        case actionType.MARK_NOTIFICATION_AS_ALLREAD:
            return {
                ...state,
                notificationList: state.notificationList.map(item => {
                    item.hasRead = true
                    return item
                }) 
            }
        default:
            return state
    }
}
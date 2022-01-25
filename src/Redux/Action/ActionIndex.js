//import all types from ActionType Component...
import * as actionType from './ActionType';

export const setUser = (user) => {
    return {
        type: actionType.SET_USER,
        payload:
        {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionType.CLEAR_USER,

    }
}

export const setGroup = (group) => {
    return {
        type: actionType.SET_GROUP,
        payload:
        {
            currentGroup: group,
        }
    }
}
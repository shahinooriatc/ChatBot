// import library combinereducer from redux.... for Packet all reducers function...
import { combineReducers } from 'redux';


const initialState = {
    currentUser: 'null',
    isLoading: true,
}
const setUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                currentUser: action.payload.currentUser,
                isLoading: false,
            }
        case 'CLEAR_USER':
            return {
                ...initialState
            }
        default:
            return state;
    }
}

const initialGroupState = {
    currentGroup: 'null',
}
const setGroupReducer = (state = initialGroupState, action) => {
    switch (action.type) {
        case 'SET_GROUP':
            return {
                currentGroup: action.payload.currentGroup,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: setUserReducer,
    group: setGroupReducer,
});

export default rootReducer;
import { combineReducers } from 'redux';

// all plants reducer
const plantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            return action.payload;
        case "CLEAR_PLANTS":
            return [];
            default:
                return state;
    }
}

export default combineReducers({
    plantsReducer,
});
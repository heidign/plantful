import { combineReducers } from 'redux';

// all plants reducer
const plantsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    plantsReducer,
});
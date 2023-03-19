import { combineReducers } from 'redux';

// reducer for searching a plant
const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_PLANTS':
            return action.payload;
        // case "CLEAR_SEARCH":
        //     return [];
        default:
            return state;
    }
}


export default combineReducers({
    searchReducer,
});
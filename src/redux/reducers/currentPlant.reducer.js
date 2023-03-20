import { combineReducers } from 'redux';

// reducer for storing a single selected plant
const currentPlantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCH_PLANT':
			return {...state, ...action.payload};
        // case 'CLEAR_SEARCH_PLANT':
        //     return {};
        default:
            return state;
    }
}


export default currentPlantReducer


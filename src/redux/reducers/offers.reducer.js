
// get all offers reducer
const offersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OFFERS':
            return action.payload;
        case "CLEAR_PLANTS":
            return [];
        default:
            return state;
    }
}

export default offersReducer;
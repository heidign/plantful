
const editPlant = (state = { loading: true, data: {} }, action) => {
    switch (action.type) {
        case 'SET_EDIT_PLANT':
            // action.payload is the object from the db, data from reducers
            return { ...state, data: action.payload, loading: false };
        case 'EDIT_ONCHANGE':
            return {
                ...state, [action.payload.property]: action.payload.value,
                loading: false
            }
        case 'CLEAR_EDIT':
            return { ...state, loading: true }
        default:
            return state;
    }
};

export default editPlant;
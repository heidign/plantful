
const editPlant = (state = {
    nickname: '', notes: '', dateWatered: '',
    dateFertilized: '', dateRepotted: '', isOffered: false }, action) => {
    switch (action.type) {
        case 'SET_PLANT_EDIT':
            // action.payload is the object from the db, data from reducers
            return action.payload;
        case 'EDIT_ONCHANGE':
            console.log('IN ONCHANGE:', action.payload);
            return {
                ...state, [action.payload.property]: action.payload.value
            }
        case 'CLEAR_EDIT':
            return {};
        default:
            return state;
    }
};

export default editPlant;
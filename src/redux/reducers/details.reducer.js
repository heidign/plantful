
// store the plant details, data will eventually be details and dataFromUser from reducer
const plantDetailsReducer = (state = {loading: true, data: {}}, action) => {
    switch (action.type) {
      case "SET_PLANT_DETAILS":
        console.log('🟣 set plant details', action.payload);
        return { ...state, data: action.payload, loading: false };
      case 'CLEAR_DETAILS':
        return { ...state, loading: true }
      default:
        return state;
    }
};
  
export default plantDetailsReducer;

// store the plant details
const plantDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
      case "SET_PLANT_DETAILS":
        return action.payload;
      case 'CLEAR_DETAILS':
        return {loading: true}
      default:
        return state;
    }
};
  
export default plantDetailsReducer;
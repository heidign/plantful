import { combineReducers } from "redux";
// store the plant details
// const plantDetailsReducer = (state = { loading: true, data: {} }, action) => {
//     switch (action.type) {
//       case "SET_PLANT_DETAILS":
//         return { ...state, data: action.payload, loading: false };
//       case 'CLEAR_DETAILS':
//         return { ...state, loading: true }
//       default:
//         return state;
//     }
// };

// store user's plant details
const plantDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PLANT_DETAILS':
      return { ...state, ...action.payload };
    case 'CLEAR_PLANT_DETAILS':
      return {}
    default:
      return state;
  }
};
// store details from API
const apiDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_API_DETAILS':
      return { ...state, ...action.payload };
    case 'CLEAR_API_DETAILS':
      return {}
    default:
      return state;
  }
};
  
export default combineReducers({
  plantDetailsReducer,
  apiDetailsReducer,
});
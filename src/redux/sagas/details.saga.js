import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// * saga for fetching user's plant details from plants router
function* fetchPlantDetails(action) {
    // get plant details from db by ID
    try {
      const plantDetails = yield axios.get(`/api/plants/details/${action.payload.id}`);
      yield put({
        type: "SET_PLANT_DETAILS", payload: {
          ...plantDetails.data,
        }
      });
    } catch (error) {
      console.log("get all error", error);
    }
}

// * saga for fetching details from plants router details endpoint
function* fetchAPIDetails(action) {
  // get details from API by ID
  try {
    const plantDetails = yield axios.get(`/api/plants/details/perenual/${action.payload.id}`);
    yield put({
      type: "SET_API_DETAILS", payload: {
        ...plantDetails.data,
      }
    });
  } catch (error) {
    console.log("get all error", error);
  }
}

// wait function for loader
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// watcher saga
function* detailsSaga() {
  yield takeEvery('FETCH_PLANT_DETAILS', fetchPlantDetails);
  yield takeEvery('FETCH_API_DETAILS', fetchAPIDetails);
}
  
export default detailsSaga;
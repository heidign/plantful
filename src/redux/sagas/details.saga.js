import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// * saga for fetching details from plants router details endpoint
function* fetchDetails(action) {
    // get details from API by ID
    try {
      const plantDetails = yield axios.get(`/api/plants/details/${action.payload.id}`);
      // yield wait(200);
      yield put({
        type: "SET_PLANT_DETAILS", payload: {
          // loading: false,
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
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}
  
export default detailsSaga;
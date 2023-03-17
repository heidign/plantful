import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get all saga: fires on `FETCH_PLANTS`
function* fetchPlants() {
    try {
        // ask for plant data from db
        let plantsResponse = yield axios.get(`/api/plants`)
        // once received, send to plantsReducer
        yield put({ type: 'SET_PLANTS', payload: plantsResponse.data })
    } catch (err) {
        console.error('Error in fetchPlants saga', err);
    }
}

// POST SAGA
function* postPlant(action) {
    try {
      yield axios.post(`api/plants`, currentPlant);
      yield put({
        type: "FETCH_PLANTS",
      });
    } catch (error) {
      console.log("Error in POST Saga:", error);
    }
  }

function* plantsSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlants);
    yield takeEvery('SUBMIT_PLANT', postPlant);
}

export default plantsSaga;
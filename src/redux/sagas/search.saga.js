import { put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
    
// get all from search saga: fires on `GET_NEW_SEARCH`
function* searchPlants(action) {
    try {
        // ask for plant data
        let apiResponse = yield axios.get(`/api/search?q=${action.payload.q}`);
        // once received, send to searchReducer
        yield put({
            type: 'SET_SEARCH_PLANTS',
            payload: apiResponse.data.data
        })
    } catch (err) {
        console.error('Error in get searchPlants saga', err);
    }
}

function* postPlant(action) {
    try {
      yield axios.post(`api/search`, action.payload );
      yield put({
        type: "FETCH_ADDED_PLANT",
      });
    } catch (error) {
      console.log("Error in POST Search Saga:", error);
    }
  }

// * watcher saga
function* searchSaga() {
    yield takeEvery('GET_NEW_SEARCH', searchPlants);
    yield takeEvery('ADD_PLANT', postPlant);
}

export default searchSaga;
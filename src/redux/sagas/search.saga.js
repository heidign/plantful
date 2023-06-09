import { put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
 
// * select currentPlant reducer
const currentPlantSelector = (state) => state.currentPlant;

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
// * Saga for setting a single searched plant, fires on `SET_SEARCH_PLANT` 
//  from currentPlant reducer
function* postPlant(action) {
    try {
        yield put({
            type: 'SET_SEARCH_PLANT',
            payload: action.payload
        });
        const currentPlant = yield select(currentPlantSelector);
      yield axios.post(`api/search`, currentPlant );
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
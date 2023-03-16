import { put, takeEvery } from 'redux-saga/effects';
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

// * watcher saga
function* searchSaga() {
    yield takeEvery('GET_NEW_SEARCH', searchPlants);
}

export default searchSaga;
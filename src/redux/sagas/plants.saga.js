import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get all saga: fires on `FETCH_PLANTS`
function* fetchPlants() {
    try {
        // ask for plant data
        const plantsResponse = yield axios.get('/api/plants')
        // once received, send to plantsReducer
        yield put({ type: 'SET_PLANTS', payload: plantsResponse.data })
    } catch (err) {
        console.error('Error in fetchPlants saga', err);
    }
}

function* plantsSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlants);
}

export default plantsSaga;
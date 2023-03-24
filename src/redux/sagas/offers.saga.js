import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Get all saga: fires on `FETCH_OFFERS`
function* fetchOffers() {
    try {
        // ask for plant data from db
        let offersResponse = yield axios.get(`/api/offers`)
        // once received, send to offersReducer
        yield put({ type: 'SET_OFFERS', payload: offersResponse.data })
    } catch (error) {
        console.log("Error in GET Saga:", error);
    }
}

function* claimOffer() {
    try {
        
    } catch (error) {
        
    }
}

function* offersSaga() {
    yield takeEvery('FETCH_OFFERS', fetchOffers);
}

export default offersSaga;
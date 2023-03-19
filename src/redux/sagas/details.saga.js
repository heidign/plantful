import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// * saga for fetching details from plants router details endpoint
function* fetchDetails(action) {
    // get all details from API by ID
    try {
      const plantDetails = yield axios.get(`/api/plants/details/${action.payload.id}`);
    //   const genreDetails = yield axios.get(`/api/genre/${action.payload}`);
      // yield wait(500);
    //   console.log('GENRE DETAILS DATA', genreDetails.data);
      yield put({
        type: "SET_PLANT_DETAILS", payload: {
        //   loading: false,
          ...plantDetails.data,
        //   genres: genreDetails.data.map((genre) => genre.genre)
        }
      });
    } catch (error) {
      console.log("get all error", error);
    }
}

// * wait function for loader
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// delete plant from detail view
function* deletePlant(action) {
	try {
		yield axios.delete(`/api/plants/${action.payload}`);
		console.log("in delete axios", action.payload);
		yield put({ type: "FETCH_PLANTS" });
	} catch (err) {
		console.error("Error deleting plant", err);
	}
}
 

function* detailsSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
      // delete plant by id
  yield takeEvery("DELETE_PLANT", deletePlant);
}
  
export default detailsSaga;
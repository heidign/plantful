import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";

function* editPlantById(action) {
    //  edit plant by id
    try {
        yield axios.put(`/api/plants/edit/${action.payload.id}`, { data: action.payload.newData });
        // console.log('In editPlant PUT saga:', action);
        yield put({ type: 'SET_PLANT_EDIT', payload: action.payload.id });
    } catch (err) {
        console.error("Error in editPlant saga", err);
    }
}

// delete plant from edit view
function* deletePlant(action) {
    try {
		yield axios.delete(`/api/plants/${action.payload}`);
		console.log("IN delete saga:", action.payload.id);
        yield put({ type: "FETCH_PLANTS" });
	} catch (err) {
		console.error("Error deleting plant", err);
	}
}

// * watcher saga 
function* editAndDeleteSaga() {
    // edit plant by id 
  yield takeEvery('UPDATE_PLANT', editPlantById);
    // delete plant by id
  yield takeEvery("DELETE_PLANT", deletePlant);
}

export default editAndDeleteSaga;
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* editPlantById(action) {
  //  edit plant by id
  try {
    yield axios.put(`/api/plants/edit/${action.payload.id}`, {
      data: action.payload.newData,
    });
    console.log("In editPlant PUT saga:", action);
    yield put({ type: "SET_PLANT_EDIT", payload: action.payload.id });
  } catch (err) {
    console.error("Error in editPlant saga", err);
  }
}

// delete plant from edit view, by id
function* deletePlant(action) {
  const swal = withReactContent(Swal);

  try {
    let sweetResult = yield swal.fire({
      title: "Are you sure you want to delete this plant?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#a50104",
      cancelButtonColor: "#327c36",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweetResult.isConfirmed) {
      let response = yield axios.delete(`/api/plants/${action.payload}`);
      console.log("IN delete saga:", action.payload.id);
      yield put({ type: "FETCH_PLANTS" });
    }
  } catch (err) {
    console.error("Error deleting plant", err);
  }
}

// * watcher saga
function* editAndDeleteSaga() {
  // edit plant by id
  yield takeEvery("UPDATE_PLANT", editPlantById);
  // delete plant by id
  yield takeEvery("DELETE_PLANT", deletePlant);
}

export default editAndDeleteSaga;

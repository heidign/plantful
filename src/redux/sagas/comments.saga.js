import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Get all saga: fires on `FETCH_COMMENTS`
function* fetchBaseComments(action) {
  try {
      // ask for comment data from db
    let commentsResponse = yield axios.get(`/api/comments/${action.payload.id}`)
      // once received, send to comments Reducer
      yield put({ type: 'SET_ALL_COMMENTS', payload: commentsResponse.data })
  } catch (err) {
      console.error('Error in fetchBaseComments saga', err);
  }
}

// * Get children comments by parent_id, fires on `FETCH_CHILDREN`
function* fetchChildrenComments(action) {
  try {
    // ask for children comments
    const response = yield axios.get(`/api/comments/children/${action.payload}`)
    // once received, send to commentThread Reducer
    yield put({ type: 'ADD_CHILDREN_COMMENTS', payload: response.data })
  } catch (err) {
    console.error('Error in fetchChildrenComments saga', err);
  }
}

// * Select user reducer to access username
const userSelector = (state) => state.user;

// * Post a comment: fires on `POST_COMMENT`
function* postComment(action) {
  try {
    console.log(action.payload)
    const response = yield axios.post(`/api/comments`, action.payload);
    const user = yield select(userSelector)
    response.data.username = user.username;
    response.data.avatar_image = user.avatar_image
    if (response.data.parent_id) {
      yield put({
        type: "ADD_CHILDREN_COMMENTS",
        payload: [response.data]
      });
    } else {
      yield put({
        type: "ADD_BASE_COMMENT",
        payload: response.data
      });
    }
  } catch (error) {
    console.log("Error in POST Saga:", error);
  }
}


function* commentsSaga() {
  // GET
  yield takeEvery("FETCH_BASE_COMMENTS", fetchBaseComments);
  yield takeLatest("FETCH_CHILDREN", fetchChildrenComments);
  // POST
  yield takeEvery("POST_COMMENT", postComment);
  
}

export default commentsSaga;
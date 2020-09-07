import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchDetailSaga(action) {
  try {
    const response = yield axios.get("/details/" + action.payload);
    yield put({ type: "SET_DETAILS", payload: response.data });
  } catch (error) {}
}

function* fetchProfileBookSaga() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }; 
      const response = yield axios.get('/profile', config);
      yield put({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
    }
  }
  function* fetchQuestionSaga(action) {
    try {
      const response = yield axios.get('/quiz');
      yield put({ type: 'SET_QUIZ', payload: response.data });
    } catch (error) {
    }
  }

  function* fetchDetailSaga(action) {
    try {
        const response = yield axios.get('/details/'+ action.payload)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
    }
}

function* deleteBookSaga(action) {
    try {
        const response = yield axios.delete('/profile/'+ action.payload.book_id)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
    }
}
function* finishBookSaga(action) {
    try {
        const response = yield axios.put('/profile/'+ action.payload.book_id)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
    }
}

function* rateBookSaga(action) {
  try {
      const response = yield axios.put(`/details/${action.payload.item.book_id}`, action.payload)
      yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
  } catch (error) {
  }
}

function* profileBooksSaga() {
  yield takeLatest("DELETE_BOOK", deleteBookSaga);
  yield takeLatest("FETCH_DETAILS", fetchDetailSaga);
  yield takeLatest("FETCH_PROFILE_BOOKS", fetchProfileBookSaga);
  yield takeLatest("FINISH_BOOK", finishBookSaga);
  yield takeLatest("RATE_BOOK", rateBookSaga);
}

export default profileBooksSaga;

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProfileBookSaga() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }; 
      const response = yield axios.get('/profile', config);
      yield put({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
      console.log('Secrets get request failed', error);
    }
  }

  function* fetchDetailSaga(action) {
    console.log('in detailsSaga...', action.payload)
    try {
        // get request that gets movies from database
        const response = yield axios.get('/details/'+ action.payload)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('issue with details get saga:', error)
    }
}

function* deleteBookSaga(action) {
    console.log('in deleteBookSaga...', action.payload)
    try {
        // get request that gets movies from database
        const response = yield axios.delete('/profile/'+ action.payload.book_id)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
        console.log('issue with deleteBookSaga :', error)
    }
}

function* profileBooksSaga() {
    yield takeLatest('FETCH_PROFILE_BOOKS', fetchProfileBookSaga);
    yield takeLatest('FETCH_DETAILS', fetchDetailSaga);
    yield takeLatest('DELETE_BOOK', deleteBookSaga);
  }

export default profileBooksSaga;
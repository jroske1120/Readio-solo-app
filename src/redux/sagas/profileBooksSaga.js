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

function* profileBooksSaga() {
    yield takeLatest('FETCH_PROFILE_BOOKS', fetchProfileBookSaga);
  }

export default profileBooksSaga;
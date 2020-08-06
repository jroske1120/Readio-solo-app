import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStudents(action) {
    try {
      const response = yield axios.get('/student');
      yield put({ type: 'SET_STUDENTS', payload: response.data });
    } catch (error) {
      console.log('Secrets get request failed', error);
    }
  }
  function* studentSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
  }

  export default studentSaga;
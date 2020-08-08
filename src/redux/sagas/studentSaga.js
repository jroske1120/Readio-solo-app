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

  function* removeStudentSaga(action) {
    console.log('in removeStudentSaga...', action.payload)
    try {
        // get request that gets movies from database
        const response = yield axios.delete('/student/'+ action.payload.id)
        yield put({ type: 'FETCH_STUDENTS', payload: response.data })
    } catch (error) {
        console.log('issue with removeStudentSaga :', error)
    }
}
  function* studentSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
    yield takeLatest('REMOVE_STUDENT', removeStudentSaga);

  }

  export default studentSaga;
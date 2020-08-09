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
function* addStudentSaga(action){
  console.log('trying to send:', action.payload)
  try {
    const response = yield axios.post('/student', action.payload)
    yield put({type:"FETCH_STUDENTS", payload: response.data})
  } catch (error) {
    console.log('issue with post saga:', error)
  }
}
  function* studentSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
    yield takeLatest('REMOVE_STUDENT', removeStudentSaga);
    yield takeLatest('ADD_STUDENT', addStudentSaga);

  }

  export default studentSaga;
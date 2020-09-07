import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addStudentSaga(action){
  try {
    const response = yield axios.post('/student', action.payload)
    yield put({type:"FETCH_STUDENTS", payload: response.data})
  } catch (error) {
  }
}

function* fetchStudents(action) {
    try {
      const response = yield axios.get('/student');
      yield put({ type: 'SET_STUDENTS', payload: response.data });
    } catch (error) {
    }
  }

  function* removeStudentSaga(action) {
    try {
        const response = yield axios.delete('/student/'+ action.payload.id)
        yield put({ type: 'FETCH_STUDENTS', payload: response.data })
    } catch (error) {
    }
}
function* addStudentSaga(action){
  try {
    const response = yield axios.post('/student', action.payload)
    yield put({type:"FETCH_STUDENTS", payload: response.data})
  } catch (error) {
  }
}
  function* studentSaga() {
    yield takeLatest('ADD_STUDENT', addStudentSaga);
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
    yield takeLatest('REMOVE_STUDENT', removeStudentSaga);
  }

  export default studentSaga;

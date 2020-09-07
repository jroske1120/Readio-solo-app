import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submitQuizSaga(action) {
    try {
        const response = yield axios.put(`/quiz/${action.payload.book_id}`, action.payload)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
        console.log('issue with submitQuizSaga :', error)
    }
}

function* getQuizSaga(action) {
    try {
        const response = yield axios.get('/quiz/'+ action.payload.id)
        yield put({ type: 'SET_QUIZ', payload: response.data })
    } catch (error) {
    }
}
function* editFeedbackSaga(action) {
   try {
        const response = yield axios.put(`/student/${action.payload.book_id}`, action.payload)
        yield put({ type: 'SET_QUIZ', payload: response.data })
        yield put({ type: 'FETCH_STUDENTS', payload: response.data })
    } catch (error) {
   }
}

function* quizSaga() {
    yield takeLatest('SUBMIT_QUIZ', submitQuizSaga);
    yield takeLatest('FETCH_QUIZZES', getQuizSaga);
    yield takeLatest('SUBMIT_FEEDBACK', editFeedbackSaga);
  }

export default quizSaga;
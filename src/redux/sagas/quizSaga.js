import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editFeedbackSaga(action) {
    try {
         const response = yield axios.put(`/student/${action.payload.book_id}`, action.payload)
         yield put({ type: 'SET_QUIZ', payload: response.data })
     } catch (error) {
    }
 }

function* submitQuizSaga(action) {
    try {
        const response = yield axios.put(`/quiz/${action.payload.book_id}`, action.payload)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
    }
}

function* quizSaga() {
    yield takeLatest('SUBMIT_FEEDBACK', editFeedbackSaga);
    yield takeLatest('SUBMIT_QUIZ', submitQuizSaga);
  }

export default quizSaga;
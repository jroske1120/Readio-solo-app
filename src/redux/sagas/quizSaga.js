import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submitQuizSaga(action) {
    console.log('in submitQuizSaga...', action.payload)
    try {
        // get request that gets movies from database
        const response = yield axios.put(`/quiz/${action.payload.book_id}`, action.payload)
        yield put({ type: 'FETCH_PROFILE_BOOKS', payload: response.data })
    } catch (error) {
        console.log('issue with submitQuizSaga :', error)
    }
}

function* getQuizSaga(action) {
    console.log('in getQuizSaga...', action.payload)
    try {
        // get request that gets movies from database
        const response = yield axios.get('/quiz/'+ action.payload.id)
        yield put({ type: 'SET_QUIZ', payload: response.data })
    } catch (error) {
        console.log('issue with getQuizSaga :', error)
    }
}
function* editFeedbackSaga(action) {
    console.log('in editFeedbackSaga...', action.payload)
   try {
        const response = yield axios.put(`/student/${action.payload.book_id}`, action.payload)
        yield put({ type: 'SET_QUIZ', payload: response.data })
    } catch (error) {
       console.log('issue with editFeedbackSaga :', error)
   }
}

function* quizSaga() {
    yield takeLatest('SUBMIT_QUIZ', submitQuizSaga);
    yield takeLatest('FETCH_QUIZZES', getQuizSaga);
    yield takeLatest('SUBMIT_FEEDBACK', editFeedbackSaga);
  }

export default quizSaga;
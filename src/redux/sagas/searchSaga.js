import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addBookSaga(action){
  try {
    const response = yield axios.post('/api/searchFullText', action.payload)
    yield put({type:"FETCH_PROFILE_BOOKS", payload: response.data})
    yield put({ type: 'UNSET_SEARCH' });
  } catch (error) {
  }
}

function* getBookSaga(action){
    try {
      const response = yield axios.get('/api/searchFullText', {params: {search: action.payload}})
      yield put({type:"SET_SEARCH", payload: response.data.items})
    } catch (error) {
    }
  }

  
function* searchSaga() {
  yield takeLatest('ADD_BOOK', addBookSaga);
  yield takeLatest('FETCH_BOOKS', getBookSaga);
}

export default searchSaga;
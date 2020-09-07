import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets search results
function* getBookSaga(action){
    try {
      // get request that sends search query
      const response = yield axios.get('/api/searchFullText', {params: {search: action.payload}})
      yield put({type:"SET_SEARCH", payload: response.data.items})
    } catch (error) {
    }
  }

  function* addBookSaga(action){
    try {
      // get request that sends search query
      const response = yield axios.post('/api/searchFullText', action.payload)
      yield put({type:"FETCH_PROFILE_BOOKS", payload: response.data})
      yield put({ type: 'UNSET_SEARCH' });
    } catch (error) {
    }
  }

function* searchSaga() {
  yield takeLatest('FETCH_BOOKS', getBookSaga);
  yield takeLatest('ADD_BOOK', addBookSaga);
}

export default searchSaga;
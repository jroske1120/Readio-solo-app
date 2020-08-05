import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets search results
function* getBookSaga(action){
    // console.log('trying to send:', action.payload)
    try {
      // get request that sends search query
      const response = yield axios.get('/api/searchFullText', {params: {search: action.payload}})
      yield put({type:"SET_SEARCH", payload: response.data.items})
    } catch (error) {
      console.log('issue with search saga:', error)
    }
  }

  function* addBookSaga(action){
    console.log('trying to send:', action.payload)
    try {
      // get request that sends search query
      const response = yield axios.post('/api/searchFullText', action.payload)
      yield put({type:"FETCH_BOOKS", payload: response.data})
    } catch (error) {
      console.log('issue with post saga:', error)
    }
  }

function* searchSaga() {
  yield takeLatest('FETCH_BOOKS', getBookSaga);
  yield takeLatest('ADD_BOOK', addBookSaga);
}

export default searchSaga;
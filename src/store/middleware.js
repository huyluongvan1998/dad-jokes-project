import { takeLeading } from 'redux-saga/effects';
import { fetchJokesHandle } from './modules/app/saga';
import { fetchJokes } from './modules/app/slice';






export default function* rootSaga() {
  yield takeLeading (fetchJokes, fetchJokesHandle)
}

import { all, call } from 'redux-saga/effects';
import { appMiddleware } from './modules/app/saga';

export default function* rootSaga() {
  yield all([call(appMiddleware)]);
}

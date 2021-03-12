import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware  from 'redux-saga';

import rootReducer from "./reducer";
import rootSaga from './middleware';




const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk:false }), sagaMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

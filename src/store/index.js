import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducer';
// import appSlice from "./modules/app/slice";

// const sagaMiddleware = createSagaMiddleware();

// const middleware = [...getDefaultMiddleware({ thunk:false }), sagaMiddleware]

export const store = configureStore({
    reducer: rootReducer,
    // middleware,
  });
// sagaMiddleware.run();

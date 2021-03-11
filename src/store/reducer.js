import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './modules/app/slice';

const rootReducer = () => 
    combineReducers ({
        app: appSlice
    })


export default rootReducer();
import axios from 'axios';
import { put } from 'redux-saga/effects';
import { setJokes } from "./slice";
// import axios from 'axios';

export function* fetchJokesHandle () {  
    try {
        const header = {"Accept":"application/json"}
        let dataMapping = [];
        for(let i = 0; i < 10; i++) {
            const res = yield axios({method:'get', url: 'https://icanhazdadjoke.com/', headers: header});
            dataMapping.push(res.data);
        }
        yield put(setJokes(dataMapping))
            return dataMapping;
          } catch (error) {
            console.error('mess: ', error);
          } 
    };


// export function* helloSaga() {
//  yield console.log('Hello Sagas!');
// }





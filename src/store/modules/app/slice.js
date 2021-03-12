import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
    isLoading: false,
    anhDung: []
  },
  reducers: {
    fetchJokes: () => {},
    setJokes: (state, action) => {
      const temp_arr = action.payload;
      (temp_arr || []).map(el => {
        const {id, joke, status} = el;
        if(status === 200) {
          return state.jokes.push({id: id, text: joke, isLoading: false, votes: 0})
        } else {
          return console.log('error at slice');
        }
      })
    },

    increment: (state, action) => {
      const { payload } = action;
      state.jokes.map((el) => (el.id === payload ? el.votes++ : el.votes));
    },
    decrement: (state, action) => {
      const { payload } = action;
      state.jokes.map((el) => (el.id === payload ? el.votes-- : el.votes));
    },

    sortJokes: (state) => {
      state.jokes.sort((a, b) => b.votes - a.votes);
      window.localStorage.setItem("jokes", JSON.stringify([...state.jokes]));
    },
  },
});

export const { fetchJokes, increment, decrement, sortJokes, setJokes } = appSlice.actions;

export default appSlice.reducer;

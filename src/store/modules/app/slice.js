import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
    isLoading: false,
  },
  reducers: {
    fetchJokes: () => {},

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

export const { fetchJokes, increment, decrement, sortJokes } = appSlice.actions;

export default appSlice.reducer;

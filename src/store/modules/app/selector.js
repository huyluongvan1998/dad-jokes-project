import { createSelector } from "reselect";

const getAllJokes = (state) => state.app.jokes;
export const JokesSelector = createSelector(getAllJokes, (jokes) => jokes);

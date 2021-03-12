import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joke from "./Joke";
import "./JokeList.css";
import { JokesSelector } from "./store/modules/app/selector";
import { decrement, fetchJokes, increment, sortJokes } from "./store/modules/app/slice";
// import { axiosGetJokes } from "./api/app";


const JokeList = () => {
  const dispatch = useDispatch();
  //Loading not fixed yet
  const [data, setData] = useState({
    loading: false,
  });
  //Loading temporary

  let jokes = useSelector(JokesSelector);

  useEffect(() => {
    return () => {
      dispatch(sortJokes());
      setData({loading: false})
    };
  }, [jokes, dispatch]);

  

  //get 10 jokes
  const getJokes = async () => {
        dispatch(fetchJokes());
  };
  


  //Function to generate jokes on clicked
  const handleClick = () => {
    setData({ ...data, loading: true });
    getJokes();
  };
  

  //check to display loading
  if (data.loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  } // else

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="err"
        />
        <button className="JokeList-getmore" onClick={() => handleClick()}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {jokes.map((j) => (
          <Joke
            key={j.id}
            votes={j.votes}
            text={j.text}
            upvote={() => dispatch(increment(j.id))}
            downvote={() => dispatch(decrement(j.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default JokeList;

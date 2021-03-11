import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";
import "./JokeList.css";
import { useSelector, useDispatch } from "react-redux";
import { JokesSelector } from "./store/modules/app/selector";
import { increment, decrement, sortJokes } from "./store/modules/app/slice";
const defaultProps = {
  numJokesToGet: 10,
};
let seenJokes = new Set();

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
      
    };
  }, [jokes, dispatch]);

  // run everyrtime data.jokes changed to set seenJokers [used for validate duplicate]
  useEffect(() => {
    if (jokes.length > 0) {
      seenJokes = new Set(jokes.map((j) => j.text));
    } else {
      return;
    }
  }, [jokes]);

  // Call API function will change when applied saga

  //Generate jokes function [have defaultProps.numJokesToGet jokes]
  const getJokes = async () => {
    try {
      let jokesList = [];
      while (jokesList.length < defaultProps.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let newJoke = res.data.joke;
        if (!seenJokes.has(newJoke)) {
          //check duplicate
          jokesList.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newJoke);
        }
      }
      //set jokes to jokes list if jokes already exist then combine 2 array
      setData(
        { ...data, jokes: [...jokes, ...jokesList], loading: false },
        window.localStorage.setItem(
          "jokes",
          JSON.stringify([...jokes, ...jokesList])
        )
      );
    } catch (e) {
      alert(e);
      //if error set loading
      setData({ ...data, loading: false });
    }
  };
  // Call API function will change when applied saga

  //Will change when applied SAGA
  //Function to generate jokes on clicked
  const handleClick = () => {
    setData({ ...data, loading: true });
    getJokes();
  };
  //Will change when applied SAGA

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

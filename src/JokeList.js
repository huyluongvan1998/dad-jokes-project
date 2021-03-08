import React, {useState, useEffect} from 'react';
import axios from "axios";
import uuid from "uuid/v4";
import Joke from "./Joke";
import "./JokeList.css";

const defaultProps = {
  numJokesToGet: 10
};
let seenJokes = new Set();

const JokeList = () => {
  
    const [data, setData] = useState({
      jokes:  JSON.parse(window.localStorage.getItem('jokes')) || [] ,
      loading: false
    })

    
  // run everyrtime data.jokes changed to set seenJokers [used for validate duplicate]
  useEffect(()=> {
    if(data.jokes.length > 0) {
      seenJokes = new Set(data.jokes.map(j => j.text));
      console.log(seenJokes);
    } else {
      return;
    }
    
  },[data.jokes])
 

  //Generate jokes function [have defaultProps.numJokesToGet jokes]
  const getJokes = async () => {
    try {
      let jokesList = [];
      while (jokesList.length < defaultProps.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
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
      setData(({...data, jokes: [...jokes, ...jokesList], loading: false}),
      window.localStorage.setItem("jokes", JSON.stringify([...jokes, ...jokesList])) 
      );
    } catch (e) {
      alert(e);
      //if error set loading
      setData({...data, loading: false });
    }
  }

  
 

  //Function for handle Vote 
  const handleVote = (id, delta)  => {
    setData(
      st => ({...data, jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j //set field votes of jokes depend on id and delta(1 or -1)
        )
      })
    )
  }
  

//Function to generate jokes on clicked
  const handleClick = () => {
    setData({...data, loading: true });
    getJokes();
  }




  //check to display loading
    if (data.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }// else 
    let jokes = data.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='err' />
          <button className='JokeList-getmore' onClick={() => handleClick()}>
            Fetch Jokes
          </button>
        </div>

        <div className='JokeList-jokes'>
          {jokes.map(j => (
            <Joke
              key={j.id}
              votes={j.votes}
              text={j.text}
              upvote={() => handleVote(j.id, 1)}
              downvote={() => handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }

export default JokeList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MATCHUP } from "../utils/mutations";
import { Link } from "react-router-dom";

import API from "../";

//Get request for random question
const RandomQ = () => {
  const loading = false;
  let newIncorrect = [];
  let category = "";
  let capCategory = category.toUpperCase();
  let finallist = [];
  let [score, setScore] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [questionLoaded, setQuestionLoaded] = useState(false);
  let [displaySummary, setDisplaySummary] = useState(false);
  let [currentQuestion, setCurrentQuestion] = useState({});
  useEffect(async () => {
    const resp = await fetch("https://the-trivia-api.com/v2/questions", {
      headers: {
        // An API key is not required for this endpoint,
        // but can be used to bypass the rate limit or request
        // more questions.
        // "x-api-key": "LinkPI_KEY",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log("Hey it worked", resp);
    // storing input name
    localStorage.setItem("name", JSON.stringify(resp));

    loadQuestion(resp[0]);

    // Add data from the resp object to the page

    // console.log("This is the data!", resp);
  }, []);

  useEffect(() => {
    if (currentIndex >= 10) {
      setQuestionLoaded(false);
      setDisplaySummary(true);
    } else {
      advanceQuestion();
    }
  }, [currentIndex]);

  // getting stored value
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  // Used like so
  function loadQuestion(qObj) {
    let arr = [2, 11, 37, 42];
    shuffle(arr);
    console.log(arr);
    setCurrentQuestion({ ...qObj }); // always starts at 0

    category = qObj.category;
    capCategory = category.toUpperCase();

    console.log("Current question!", currentQuestion);

    if (!questionLoaded) {
      setQuestionLoaded(true);
    }
  }

  const getAnswers = () => {
    let newIncorrect = [...currentQuestion.incorrectAnswers];
    let answers = [];
    newIncorrect.forEach((answer) => {
      answers.push(answer);
    });
    answers.push(currentQuestion.correctAnswer);
    finallist = shuffle(answers);
    console.log(answers);
    return finallist;
  };

  const advanceQuestion = () => {
    const questions = JSON.parse(localStorage.getItem("name"));
    loadQuestion(questions[currentIndex]);
  };

  const handleAnswerClick = (answer) => {
    const setName = localStorage.getItem("name");
    if (answer === currentQuestion.correctAnswer) {
      console.log("correct");
      setScore(score + 1);
      console.log(score);
    }

    setCurrentIndex(currentIndex + 1); // Increment currentIndex by 1
  };

  return (
    <main>
      <div className="card bg-white p-5 rounded-lg shadow game" id="game">
        <div className="card-header questions-header">
          <h1>{capCategory}</h1>
        </div>
        {!questionLoaded ? (
          displaySummary ? (
            <div
              className="card bg-white p-5 rounded-lg shadow gameover"
              id="gameover"
            >
              <h1>
                Game Over: You Got {score}/10 Correct
                <a href="/" className="btn btn-outline-dark mx-4">
                  {" "}
                  Home
                </a>{" "}
              </h1>
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a className="btn btn-primary disabled placeholder col-6"></a>
            </div>
          )
        ) : (
          <div className="card-body questionscard">
            <h3 className="card-title">{currentQuestion.question.text}</h3>
            <ul className="multiplechoice">
              {getAnswers().map((choice) => (
                <li key={choice}>
                  <a onClick={() => handleAnswerClick(choice)}>{choice}</a>
                </li>
              ))}
            </ul>
            <a href="#" className="btn btn-primary " id="submitbtn">
              Submit
            </a>
          </div>
        )}
      </div>
    </main>
  );
};

export default RandomQ;

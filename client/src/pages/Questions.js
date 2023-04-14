import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_TECH } from "../utils/queries";
import { CREATE_MATCHUP } from "../utils/mutations";
import API from "../";

//Get request for random question
const RandomQ = () => {
  const { loading, data } = useQuery(QUERY_TECH);

  useEffect(async () => {
    const resp = await fetch(
      "https://the-trivia-api.com/v2/questions",
      {
        headers: {
          // An API key is not required for this endpoint,
          // but can be used to bypass the rate limit or request
          // more questions.
          // "x-api-key": "LinkPI_KEY",
          "Content-Type": "application/json",
        },
      }
    ).then(res => res.json());

    // Add data from the resp object to the page

    console.log("This is the data!", resp);
  }, [])

  const handleAnswerClick = (answer) => {
    console.log(answer);
  };

  const choices = [
    {
      category: "music",
      id: "5f9f1b9b0e1b9c0017a5f1a5",
      question: {
        text: "What is the capital of France?",
      },
      correctAnswer: "Paris",
      incorrectAnswers: ["London", "Berlin", "Brussels"],
      type: "text_choice",
    },
  ];
  return (
    <main>
      <div className="card bg-white p-5 rounded-lg shadow">
        <div className="card-header questions-header">
          <h1>Category</h1>
          <p>00:00:00</p>
        </div>
        {loading ? (
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <a class="btn btn-primary disabled placeholder col-6"></a>
          </div>
        ) : (
          <div className="card-body questionscard">
            <h3 className="card-title">{choices[0].question.text}</h3>
            <ul className="multiplechoice">
              {choices[0].incorrectAnswers.map((choice) => (
                <li key={choice}>
                  <a onClick={() => handleAnswerClick(choice)}>{choice}</a>
                </li>
              ))}
            </ul>
            <a href="#" class="btn btn-primary" id="submitbtn">
              Submit
            </a>
          </div>
        )}
        {<div>Something went wrong...</div>}
      </div>
    </main>
  );
};
export default RandomQ;

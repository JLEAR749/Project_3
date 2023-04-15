import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_TECH } from "../utils/queries";
import { CREATE_MATCHUP } from "../utils/mutations";
import { Link } from 'react-router-dom';

import API from "../";

//Get request for random question
const RandomQ = () => {
    const { loading, data } = useQuery(QUERY_TECH);
    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
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

        // storing input name
        localStorage.setItem("name", JSON.stringify(resp));

        // Add data from the resp object to the page
      
        // console.log("This is the data!", resp);
    }, [])

    // getting stored value
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
      // Used like so
      var arr = [2, 11, 37, 42];
      shuffle(arr);
      console.log(arr);
    const answers = []
    const saved = localStorage.getItem("name");
    const setName = JSON.parse(saved);
    console.log(setName);
    let currentQuestion = setName[currentIndex]

    let newincorrect = currentQuestion.incorrectAnswers;
    let Category = currentQuestion.category;
    let capCategory = Category.toUpperCase();
    
    console.log(newincorrect);
    newincorrect.forEach(answer => {
        answers.push(answer)
    });
    answers.push(currentQuestion.correctAnswer)
    const finallist = shuffle(answers)
    console.log(answers);
    for (let i = 0; i <3; i++) {
        const element = answers[i];
        console.log(element);
        
    }
    
    const handleAnswerClick = (answer) => {
        if (answer === currentQuestion.correctAnswer) {
            console.log('correct');
            setScore(score + 1);
            console.log(score);

        }
        if (currentIndex < setName.length - 1) {
            
            setCurrentIndex(currentIndex + 1); // Increment currentIndex by 1
          } else {
            // If currentIndex is at the last index, loop back to the beginning of the array
            console.log("Game Over: }" + "You Got " + score+'/10');
            document.getElementById('submitbtn').style.display = 'block';
            document.getElementById('game').style.display = 'none';
            document.getElementById('gameover').style.display = 'block';
          }
    };

    return (
        <main>
            <div className="card bg-white p-5 rounded-lg shadow game" id="game">
                <div className="card-header questions-header">
                    <h1>{capCategory}</h1>
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
                        <h3 className="card-title">{currentQuestion.question.text}</h3>
                        <ul className="multiplechoice">
                            {finallist.map((choice) => (
                                <li key={choice}>
                                    <a onClick={() => handleAnswerClick(choice)}>{choice}</a>
                                </li>
                            ))}
                        </ul>
                        <a href="#" class="btn btn-primary " id="submitbtn">
                            Submit
                        </a>
                    </div>
                )}
                {<div>Something went wrong...</div>}
            </div>
            <div className="card bg-white p-5 rounded-lg shadow gameover" id="gameover">
                <h1>Game Over: You Got {score}/10 <a href="/" className="btn btn-outline-dark"> Home</a> </h1>
            </div>
        </main>
    );
};
export default RandomQ;

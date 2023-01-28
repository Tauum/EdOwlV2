import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom'
import React, { Component } from "react";
import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Countdown from "react-countdown";

import "./QuizReview.css"

export default function QuizReview(props) {

  const [submittedQuiz, setSubmittedQuiz] = useState('')
  const [executedSet, setExecutedSet] = useState(false);

  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state)
      setSubmittedQuiz(props.location.state)
      setExecutedSet(true)
    }
    else {
      setMissingParentData(true)
    }
  }, [])

  if (missingParentData === true) {
    return (<Redirect to="/Dashboard"></Redirect>);
  }

  if (executedSet) {
    return (
      <div className='quiz-review-main'>

        <div className='quiz-review-container'>
          <h1>{submittedQuiz.quiz.title} - Quiz Review</h1>
          <br />
          Score: {submittedQuiz.score} / {submittedQuiz.quiz.value}
          <br /> <br />
          Time: user time goes here / {submittedQuiz.quiz.timeLimit}
          <br /> <br /> <br />
          <div className='review-question-list'>
            {submittedQuiz.submittedQuestions.map((submittedQuestion, index) => (
              <div key={index}>
                <li className="review-question-entries" >
                    <div>
                      <div className="" data-label="question">Question {index + 1} -
                        Worth: {submittedQuiz.quiz.questions[index].value}  </div>
                      <div className="" data-label="question">{submittedQuestion.question}</div>
                    </div>
                    
                    <div></div>
                  <br />

                  {submittedQuestion.answer ? <div>You answered: <br /> {submittedQuestion.answer}</div> : <div></div>}

                  <br />

                  {submittedQuestion.correct === true
                    ?
                    <div>This is Correct! :D</div>
                    : <div>This is Incorrect :( </div>
                  }

                  <br />
                  <div>{submittedQuestion.explaination ? submittedQuestion.explaination : <div></div>}</div>

                </li>
              </div>
            ))}

          </div>
        </div>

      </div>
    );
  }

  else {
    return (
      <div className='app'>
        aaaa
      </div>

    );
  }

}



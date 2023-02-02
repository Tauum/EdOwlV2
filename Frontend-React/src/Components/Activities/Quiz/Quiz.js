import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Countdown from "react-countdown";

import './Quiz.css';
import { useStateValue } from '../../../Functionality/StateProvider';
import { postSubmittedQuizRequest, redirectGetRequest, putRatingRequest } from '../../../Functionality/Requests';

export default function Quiz() {
  
  const navigate = useNavigate();
  const params = useParams();
  const quizId = params?.id;
  const [{ user }] = useStateValue();

  const [quiz, setQuiz] = useState({title:"", questions:[]})
  const [submittedQuiz, setSubmittedQuiz] = useState({user: user, quiz: {}, score: 0, generatedDate:0, timeTaken: 0, rating:{}, submittedQuestions:[] })
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const [current, setCurrent] = useState(0);
  const [timeLimit, setTimeLimit] = useState(Date.now() + 10000); // needed to set this so doesnt end before initialization
  const [coppied, setCoppied] = useState(false);
  const [resultPercentage, setResultPercentage] = useState()
  const [rating, setRating] = useState(true)
  const [initialDate, setDate] = useState(new Date())
  const [timeTaken, setTimeTaken] = useState()

  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  const Completionist = () => <h4><span>Time has run out!</span></h4>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) { return <Completionist/>; }
    else { return <h4><span>{hours}:{minutes}:{seconds}</span></h4>; } // Render countdown
  };

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
      var data = (await redirectGetRequest(navigate,`Quizzes/${quizId}`))
      setQuiz(data)
      setTimeLimit((data.timeLimit * 1000) + Date.now())
      setRender(true)
      setSubmittedQuiz({user: user, quiz: quiz, score: 0, generatedDate:0, timeTaken: 0, rating:{}, submittedQuestions:[] })
  }
  
  useEffect(() => { setResultPercentage(((submittedQuiz.submittedQuestions.filter((sq) => {return sq.correct}).length / quiz.questions.length) * 100).toFixed(2)) },[submittedQuiz])

  const handleCopy = (e) => { setCoppied(true); }

  const handleAnswerButton = (question, answer) => {
    storeQuestion(answer)
    const next = current + 1;
    if (next < quiz.questions.length) { setCurrent(next); }
    else { finalize() }
  };
  
  function storeQuestion(answer) {
    var question = quiz.questions[current]
    var score = 0;
    if (answer.correct === true) {
      score = question.value
    }
    var submittedQuestion =
    {
      questionId: question.id,
      question: question.question,
      answerId: answer.id,
      answer: answer.content,
      explaination: question.explaination,
      correct: answer.correct,
      score: score,
      questionValue: question.value,
      // timeTaken : Date.now(), // this doesnt work
      coppied: coppied
    }
    setSubmittedQuiz((submittedQuiz) => ({...submittedQuiz, submittedQuestions: submittedQuiz.submittedQuestions.concat(submittedQuestion)}))
    setCoppied(false)
  }

  async function finalize() { // this cuts the quiz via time here
    if(!alreadySubmitted){
    setAlreadySubmitted(true)
    var difference = Math.round((new Date() - new Date(initialDate)) / 1000);
    setTimeTaken(difference)
    setShow(true);

    setSubmittedQuiz( await postSubmittedQuizRequest("SubmittedQuizzes/add",
        {
          quiz: quiz, user: user, 
          // score: scoreTotal, // calculate scoresomehow
          generatedDate: initialDate, timeTaken: difference,
          rating: rating, submittedQuestions: submittedQuiz.submittedQuestions
        })
      )

    // fetch(`${window.ipAddress.ip}/SubmittedQuiz/add`, {
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(
    //     {
    //       user: window.BackendUser,
    //       quizTitle: quiz.title,
    //       quizValue: quiz.value,
    //       quizSubject: quiz.subject,
    //       quizTimeLimit: quiz.timeLimit,
    //       submittedQuestions: submittedQuestions,
    //       quizId: quiz.id,
    //       rating: true,

    //       score: scoreTotal, // change this
    //       generatedDate: currentDate,
    //       timeTaken: difference
    //     })
    // })
    //   .then(res => res.json())
    //   .catch(error => {
    //     console.log("error: " + error);
    //   })
    //   .then((result) => {
    //     setShow(true)
    //     setSubmittedQuiz(result)
    //   })
    }
  }

  const HandleRatingClicked = () => {
    putRatingRequest(`SubmittedQuizzes/vote/${submittedQuiz.id}/${!rating}`)
    setRating(!rating)
  }


  if (render === true){
    return (
      <div className='quiz-main body font'>
        <div className='quiz-container'>
          <Countdown date={ timeLimit } onComplete={finalize} controlled={false} className='timer' id="timer">
            <Completionist/>
          </Countdown>

          <div>
            <h5 className="question-number"><span>Question {current + 1}</span>/{quiz?.questions?.length}</h5>
            <div onCopy={handleCopy}>
              <h2 className='question'>{quiz?.questions[current].question}</h2>
            </div>
          </div>

          <ul className='answers shadow'>
            {quiz?.questions[current].answers.map((answer, index) => (
              <li key={index}>
                <button className='shadow button-quiz small-scale' onClick={() => handleAnswerButton(quiz.questions[current], answer)}>
                  <h3 className='answer-text'>{answer.content}</h3>
                </button>
              </li>
            ))}
          </ul>

          <Modal className="font" show={show}>
            <div className="card text-center shadow">
              <div className="card-header">
                <div className="card-body">
                  <h4 className="card-title"> Your result is {resultPercentage} % ( {submittedQuiz?.submittedQuestions.filter((sq) => {return sq.correct}).length} of {quiz.questions.length} ) </h4>
                </div>
                <ProgressBar className='progress-bar-success' animated now={resultPercentage}/>
                <br/>
                <h5> It took: {timeTaken} Seconds to complete! </h5>

                {
                resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj big-scale" src="/Image/Emoji/0-16.svg" alt="" /> :
                resultPercentage >= 17 && resultPercentage <= 33 ? <img className="shadow emoj big-scale" src="/Image/Emoji/17-33.svg" alt="" /> :
                resultPercentage >= 34 && resultPercentage <= 50 ? <img className="shadow emoj big-scale" src="/Image/Emoji/34-50.svg" alt="" />:
                resultPercentage >= 51 && resultPercentage <= 66 ? <img className="shadow emoj big-scale" src="/Image/Emoji/51-66.svg" alt="" />:
                resultPercentage >= 67 && resultPercentage <= 83 ? <img className="shadow emoj big-scale" src="/Image/Emoji/67-83.svg" alt="" />:
                resultPercentage >= 84 && resultPercentage <= 100 ? <img className="shadow emoj big-scale" src="/Image/Emoji/84-100.svg" alt="" />
                : <div></div>
                }

                <div>
                  <p className="vote-title">Did you enjoy this activity?</p>
                  <br/>
                    {rating === true ?<img className="vote-emoj emoj rating-up big-scale shadow" src="/Image/thumb-up.svg" alt="" onClick={HandleRatingClicked}/> : <img className="vote-emoj emoj rating-down shadow" src="/Image/thumb-down.svg" alt="" onClick={HandleRatingClicked}/> }
                </div>
                <br/>
                {quiz.endContent !== null ? <div className="card-footer text-muted"> <div>{quiz?.endContent}</div> </div> : <div></div>}
                <br/>
                <Link to="/Dashboard"><Button variant="btn btn-dark small-scale">Return</Button></Link>
                <Link to={{ pathname: "/QuizReview", state: submittedQuiz }}> <Button variant="btn btn-warning otherbutton">Review</Button> </Link>

              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}



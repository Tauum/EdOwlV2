import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from 'react';
import Countdown from "react-countdown";
import PostActivityModal from "../PostActivityModal/PostActivityModal"
import './Quiz.css';
import { useStateValue } from '../../../Functionality/StateProvider';
import { postSubmittedQuizRequest, redirectGetRequest } from '../../../Functionality/Requests';



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
  const [initialDate, setDate] = useState(new Date())
  const [timeTaken, setTimeTaken] = useState()

  const [totalScore, setTotalScore] = useState(0)

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
      setSubmittedQuiz({user: user, quizId: quiz.id, score: 0, generatedDate:0, timeTaken: 0, rating:true, submittedQuestions:[] })
  }
  
  useEffect(() => { setResultPercentage(((submittedQuiz.submittedQuestions.filter((sq) => {return sq.correct}).length / quiz.questions.length) * 100).toFixed(2)) },[submittedQuiz])

  const handleCopy = (e) => { setCoppied(true); }

  useEffect(() => { // this useEffect runs if all questions have been answered
    if(submittedQuiz.submittedQuestions.length > 0 && submittedQuiz.submittedQuestions.length >= quiz.questions.length){ finalize()}
  },[submittedQuiz])

  const handleAnswerButton = (question, answer) => {
    storeQuestion(answer)
    const next = current + 1;
    if (next < quiz.questions.length) { setCurrent(next); }
  };
  
   function storeQuestion(answer) {
    var question = quiz.questions[current]
    var score = 0;
    
    if (answer.correct === true) {
      score = question.value
      setTotalScore(totalScore + score)
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
    setSubmittedQuiz( await postSubmittedQuizRequest(
      {
        quizId: quiz.id, user: user, score: totalScore, 
        generatedDate: initialDate, timeTaken: difference,
        rating: true, submittedQuestions: submittedQuiz.submittedQuestions
      }))
      
    setShow(true);
    }
  }

  if (render){
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

          {show &&
          <PostActivityModal 
          endContent={quiz.endContent} 
          ratingEndpoint={`SubmittedQuizzes/vote/${submittedQuiz.id}`} 
          reviewLink={`Quiz/${quiz.id}/${submittedQuiz.id}`} 
          timeTaken={timeTaken} resultObtained={totalScore} 
          resultAvailable={quiz.value} resultPercentage={resultPercentage}/>
          }
        </div>
      </div>
    );
  }
}



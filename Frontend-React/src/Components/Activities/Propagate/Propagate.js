import React, { createContext, useState, useEffect } from 'react'
import Keyboard from './Parts/Keyboard';
import "./Propagate.css";
import "../../../index.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postSubmittedPropagateRequest, putRatingRequest, redirectGetRequest } from '../../../Functionality/Requests';
import { useStateValue } from '../../../Functionality/StateProvider';
import Letter from './Parts/Letter';
import { Button, Modal, ProgressBar } from 'react-bootstrap';

export const PropagateContext = createContext();
// https://github.com/machadop1407/Wordle-Clone-React/tree/main/src
function Propagate() {
  
  const navigate = useNavigate();
  const params = useParams();
  const propagateId = params?.id;
  const [{ user }] = useStateValue();
  const [show, setShow] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const [propagate, setPropagate] = useState();

  const [board, setBoard] = useState()
  const [current, setCurrent] = useState({ attempt: 0, letterPos: 0 });
  const [disabledKeys, setDisabledKeys] = useState([]);
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false }); // << change this for ui show

  const [submittedPropagate, setSubmittedPropagate] = useState(); //  = useState({user: user, quiz: {}, score: 0, generatedDate:0, timeTaken: 0, rating:{}, submittedQuestions:[] })
  const [initialDate, setDate] = useState(new Date())
  const [timeTaken, setTimeTaken] = useState()
  const [resultPercentage, setResultPercentage] = useState()
  const [rating, setRating] = useState(true)

  useEffect(() => { fetchData() }, [])

  useEffect(() => {
    if (gameOver.gameOver) { finalize() }
  }, [gameOver])

  async function fetchData() {
    var data = (await redirectGetRequest(navigate,`Propagates/${propagateId}`))
    setPropagate(data)
    setBoard(Array.from({ length: data.lives }, () => Array.from({ length: data.answer.length }, () => "")))
    setSubmittedPropagate({ user: user, propagate: propagate, score: 0, generatedDate: 0, timeTaken: 0, rating: {} })
  }

  async function finalize() { // this cuts the quiz via time here
    if (!alreadySubmitted) {
      setAlreadySubmitted(true)
      var difference = Math.round((new Date() - new Date(initialDate)) / 1000);
      setTimeTaken(difference)
      setShow(true);

      var submittedWords = []
      board.map((element) => {
        if (!element.some((el) => el === "")) { submittedWords = submittedWords.concat(element.join("")) }
      })

      var score = 0;
      if (gameOver.guessedWord) {
        score = (propagate.value / submittedWords.length).toFixed(2);
      }
      setResultPercentage(((score * 100) / propagate.value).toFixed(2))

      setSubmittedPropagate(await postSubmittedPropagateRequest({
          propagate: propagate, user: user, score: score,
          generatedDate: initialDate, timeTaken: difference,
          rating: rating, submittedPropagateAttempts: submittedWords
        })
      )
    }
  }


  const HandleRatingClicked = () => {
    putRatingRequest(`SubmittedPropagates/vote/${submittedPropagate.id}/${!rating}`)
    setRating(!rating)
  }

  const selectKey = (key) => {
    if (current.letterPos >= propagate.answer.length) return; // dont add more than correct word
    const newAttempt = [...board[current.attempt]];
    newAttempt[current.letterPos] = key;
    const newBoard = [...board];
    newBoard[current.attempt] = newAttempt;
    setBoard(newBoard);
    setCurrent({ attempt: current.attempt, letterPos: current.letterPos + 1 }); // increment
  }

  const deleteKey = () => {
    if (current.letterPos !== 0) {
      const newBoard = [...board];
      newBoard[current.attempt][current.letterPos - 1] = "";
      setBoard(newBoard);
      setCurrent({ ...current, letterPos: current.letterPos - 1 });
    }
  }

  const enterKey = () => {
    if (current.letterPos === propagate.answer.length) {
      let currentWordAttempt = board[current.attempt].join(""); // merge array into string
      setCurrent({ attempt: (current.attempt + 1), letterPos: 0 });

      if (currentWordAttempt.toUpperCase() === propagate.answer.toUpperCase()) { // game end correct
        setGameOver({ gameOver: true, guessedWord: true });
      }
      if ((current.attempt + 1) === propagate.lives && currentWordAttempt.toUpperCase() !== propagate.answer.toUpperCase()) { // game end incorrect
        setGameOver({ gameOver: true, guessedWord: false });
      }
      if ((current.attempt + 1) === propagate.lives && currentWordAttempt.toUpperCase() === propagate.answer.toUpperCase()){ // game end and correct
        setGameOver({ gameOver: true, guessedWord: true });
      }
    }
  }

  if (propagate) {
    return (
      <div className="Propagate font" >
        <PropagateContext.Provider value={{
          propagate,
          board, setBoard,
          current, setCurrent, selectKey, deleteKey, enterKey, setDisabledKeys, disabledKeys
        }}>

          <div className="board tiny-scale">
            {board.map((attempt, x) => (
              <div className="board-row" key={x}>
                {attempt.map((letter, y) => {
                  return <Letter className="board-row" letterPos={y} attemptVal={x} key={y} />
                })}
              </div>
            ))}
          </div>

          {gameOver.gameOver ? <div></div> : <Keyboard />}

          <Modal className="font" show={show}>
            <div className="card text-center shadow">
              <div className="card-header">
                <div className="card-body">
                  <h4 className="card-title"> Your result is </h4>
                </div>
                <ProgressBar className='progress-bar-success' animated now={resultPercentage}/>
                <br />
                <h5> It took: {timeTaken} Seconds to complete! </h5>

                {
                  resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj big-scale" src="/Image/Emoji/0-16.svg" alt="" /> :
                    resultPercentage >= 17 && resultPercentage <= 33 ? <img className="shadow emoj big-scale" src="/Image/Emoji/17-33.svg" alt="" /> :
                      resultPercentage >= 34 && resultPercentage <= 50 ? <img className="shadow emoj big-scale" src="/Image/Emoji/34-50.svg" alt="" /> :
                        resultPercentage >= 51 && resultPercentage <= 66 ? <img className="shadow emoj big-scale" src="/Image/Emoji/51-66.svg" alt="" /> :
                          resultPercentage >= 67 && resultPercentage <= 83 ? <img className="shadow emoj big-scale" src="/Image/Emoji/67-83.svg" alt="" /> :
                            resultPercentage >= 84 && resultPercentage <= 100 ? <img className="shadow emoj big-scale" src="/Image/Emoji/84-100.svg" alt="" />
                              : <div></div>
                }

                <div>
                  <p className="vote-title">Did you enjoy this activity?</p>
                  <br />
                  {rating === true ? <img className="vote-emoj emoj rating-up big-scale shadow" src="/Image/thumb-up.svg" alt="" onClick={HandleRatingClicked} /> : <img className="vote-emoj emoj rating-down shadow" src="/Image/thumb-down.svg" alt="" onClick={HandleRatingClicked} />}
                </div>
                <br />
                {propagate.endContent !== null ? <div className="card-footer text-muted"> <div>{propagate.endContent}</div> </div> : <div></div>}
                <br />
                <Link to="/Dashboard"><Button variant="btn btn-dark small-scale">Return</Button></Link>
                <Link to={{ pathname: "/PropagateReview", state: submittedPropagate }}> <Button variant="btn btn-warning otherbutton">Review</Button> </Link>

              </div>
            </div>
          </Modal>

        </PropagateContext.Provider>
      </div>
    )
  }
}

export default Propagate
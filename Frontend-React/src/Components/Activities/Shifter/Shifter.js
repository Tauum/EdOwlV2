import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react';
import PostActivityModal from "../PostActivityModal/PostActivityModal"
import './Shifter.css';
import { useStateValue } from '../../../Functionality/StateProvider';
import { postSubmittedShifterRequest, redirectGetRequest } from '../../../Functionality/Requests';

// import { useSprings, animated } from '@react-spring/web'
// import { useDrag } from 'react-use-gesture'
// import clamp from 'lodash.clamp'
// import swap from 'lodash-move'

import { useSprings, animated } from "react-spring";
import { useGesture, useDrag } from "react-with-gesture";


function Shifter() {

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    var data = (await redirectGetRequest(navigate,`Shifters/${shifterId}`))
    setSubmittedShifter({user: user, shifterId: shifter.id, score: 0, generatedDate:0, timeTaken: 0, rating:true, submittedDefinitions:[] })
    setShifter(data)
    setDefinitions(arrayShuffle(data.definitions))
    setRender(true)
  }

  function arrayShuffle(array) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [ array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const navigate = useNavigate();
  const params = useParams();
  const shifterId = params?.id;
  const [{ user }] = useStateValue();

  const [shifter, setShifter] = useState({})
  const [definitions, setDefinitions] = useState({})

  const [submittedShifter, setSubmittedShifter] = useState({user: user, shifter: {}, score: 0, generatedDate:0, timeTaken: 0, rating:{},submittedDefinitions:[]  })
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [current, setCurrent] = useState(0);
  const [resultPercentage, setResultPercentage] = useState()
  const [initialDate, setDate] = useState(new Date())
  const [timeTaken, setTimeTaken] = useState()

  const [totalScore, setTotalScore] = useState(0)

  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmitClicked = () => {
    var currentDate = new Date()
    var initial = new Date(initialDate) 
    var difference = Math.round((currentDate - initial) / 1000);
    setTimeTaken(difference)
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    for (let i = 0; i < shifter.definitions.length; i++) {
        if (shifter.definitions[i].id !== definitions[i].id) {
            incorrect++;
        }
        else {
            correct++;
            score = score + shifter.definitions[i].value
        }
    }
    // setCorrectVal(correct)

    // fetch (`${window.ipAddress.ip}/SubmittedShifters/add`,{
    //     method: "POST",  
    //     headers:{'Content-Type':'application/json'},
    //     body: JSON.stringify(
    //         { 
    //             user : window.BackendUser,
    //             shifterId: shifter.id,
    //             incorrect : incorrect, 
    //             correct: correct,
    //             score : score,
    //             timeTaken : difference,
    //             generatedDate : currentDate,
    //             rating: true
    //         }
    //     ) 
    //   })
    // .then(res=>res.json())
    // .catch(error =>{ 
    // console.log("error: " + error);
    // })
    // .then((result)=>{
    //     setSubmittedMatch(result)
    // })
    // setShow(true)
}


  useEffect(() => {console.log("shifter definitions",shifter.definitions)},[shifter])

  return (
    <div>Shifter</div>
  )
}

export default Shifter